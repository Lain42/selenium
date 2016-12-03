var
  webdriver = require('selenium-webdriver'),
  chrome = require('selenium-webdriver/chrome'),
  By = webdriver.By,
  until = webdriver.until,
  test = require('selenium-webdriver/testing');
test.describe('Login to litecart', function() {
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
    driver.get('http://127.0.0.1/admin/');
    driver.findElement(By.name('username')).sendKeys("admin");
    driver.findElement(By.name('password')).sendKeys("admin");
    driver.findElement(By.name('login')).click();
    driver.sleep(5000);
  });

  test.after(function() {
    driver.quit();
  });
});
