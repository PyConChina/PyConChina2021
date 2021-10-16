const ical = require('ical-generator');
const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const path = require('path');
const fs = require('fs').promises;
const yaml = require('js-yaml');

const year = '2021';
const baseUrl = 'https://cn.pycon.org';

const parseTime = (date, time) => {
  return dayjs(`${year}/${date} ${time}`, 'YYYY/MM/DD H:mm');
};

const loadData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'schedule.yaml');
  return yaml.load(await fs.readFile(filePath)).schedule;
};

const getDescription = ({ speaker, intro, desc }) => {
  const blocks = [];
  if (speaker) {
    blocks.push(`Speaker: ${speaker}`);
  }

  if (intro) {
    blocks.push(`Speaker Introduction: ${intro}`);
  }

  if (desc) {
    blocks.push(`Description: ${desc}`);
  }

  return blocks.join('\n\n');
};

const generate = async () => {
  const data = await loadData();
  const calendar = ical({ name: 'PyConChina 2021 Calendar' });
  data.forEach(({ date, events }) => {
    events.forEach((event) => {
      if (!event.start || event.type === 'break') {
        return;
      }
      event.talks.forEach((talk) => {
        const start = parseTime(date, event.start);
        const end = parseTime(date, event.end);
        console.log(`Adding schedule event: ${start} - ${end}`);
        calendar.createEvent({
          start,
          end,
          summary: talk.title,
          description: getDescription(talk),
          url: talk.slug ? `${baseUrl}/talks/${talk.slug}` : null,
        });
      });
    });
  });
  const destPath = path.join(process.cwd(), 'public', 'calendar.ics');
  console.log(`Saving calendar to ${destPath}`);
  await calendar.save(destPath);
};

generate();
