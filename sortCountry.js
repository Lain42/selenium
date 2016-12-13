var
  webdriver = require('selenium-webdriver'),
  chrome = require('selenium-webdriver/chrome'),
  promise = require('selenium-webdriver/lib/promise'),
  By = webdriver.By,
  until = webdriver.until,
  test = require('selenium-webdriver/testing'),
  assert = require('assert');

test.describe('Check country sort', function() {
  var driver;

  test.before(function() {
    var options = new chrome.Options();
    options.addArguments(["start-fullscreen"]);

    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    driver.getCapabilities().then(function(caps){});
  });

  test.it('check countries list', function() {
    // login 
    driver.get('http://localhost/admin/?app=countries&doc=countries');
    driver.findElement(By.name('username')).sendKeys("admin");
    driver.findElement(By.name('password')).sendKeys("admin");
    driver.findElement(By.name('login')).click();

    driver.wait(until.elementLocated(By.css("div.logotype")), 10000); ///wait sub

    // check main countries list
    var resultArr = [];
    driver.findElements(By.css('.dataTable td:nth-child(5) a')).then(function(elArr) {
      elArr.forEach(function(element) {
        element.getText().then(function(text) {
          resultArr.push(text);
        });
      });
    }).then(function() {
      var sortedCountries = resultArr.slice().sort();
      assert.deepEqual(sortedCountries, resultArr, "not sorted );");
    });
  });

  test.after(function() {
    driver.quit();
  });
});
