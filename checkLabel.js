var
  webdriver = require('selenium-webdriver'),
  chrome = require('selenium-webdriver/chrome'),
  promise = require('selenium-webdriver/lib/promise'),
  By = webdriver.By,
  until = webdriver.until,
  test = require('selenium-webdriver/testing');
var assert = require('assert');

test.describe('should contain label for every position on index page', function() {
  var driver;

  test.before(function() {
    var options = new chrome.Options();
    options.addArguments(["start-fullscreen"]);

    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    driver.getCapabilities().then(function(caps) {
      //  console.log(caps);
    });
  });

  test.it('should contain label', function() {
    driver.get('http://127.0.0.1/');

    //    driver.wait(until.elementLocated(By.css("div.logotype-wrapper")), 10000); ///wait sub

    driver.findElements(By.css(".product")).then(function(liArr) {
      liArr.forEach(function(element) {
        driver.findElement(By.css('.sticker')).then(function(el) {
          assert(el.isDisplayed());
        }).catch(function(error){
          assert(false);
        });

      });
    });
    test.after(function() {
      driver.quit();
    });
  });
});
