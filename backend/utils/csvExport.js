const { Parser } = require('json2csv');

const exportToCsv = (fields, data) => {
  try {
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);
    return csv;
  } catch (err) {
    console.error('Error generating CSV:', err);
    throw new Error('Failed to generate CSV file');
  }
};

module.exports = exportToCsv;
