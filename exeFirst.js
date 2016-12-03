var
  webdriver = require('selenium-webdriver'),
  chrome = require('selenium-webdriver/chrome'),
  By = webdriver.By,
  until = webdriver.until,
  test = require('selenium-webdriver/testing');
test.describe('Ralph says...', function() {
  var driver;

  test.before(function() {
    var options = new chrome.Options();
    options.addArguments(["start-fullscreen"]);

    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    driver.getCapabilities().then(function(caps) {
      console.log(caps);
    });
  });

  test.it('should append query to title', function() {
    driver.get('http://ralphsays.github.io/');
    driver.sleep(5000);
  });

  test.after(function() {
    driver.quit();
  });
});
