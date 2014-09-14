var mail = require('../services/MailService');

describe('services/MailService.js', function () {
  describe('sendActiveMail', function () {
    it('should ok', function () {
      mail.sendActiveMail('superhj1987@126.com', 'token', 'jacksontian');
    });
  });
});