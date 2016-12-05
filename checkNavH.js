var
  webdriver = require('selenium-webdriver'),
  chrome = require('selenium-webdriver/chrome'),
  promise = require('selenium-webdriver/lib/promise'),
  By = webdriver.By,
  until = webdriver.until,
  test = require('selenium-webdriver/testing');
var assert = require('assert');

test.describe('Check all nav items and titles', function() {
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

  test.it('should append query to title', function() {
    driver.get('http://127.0.0.1/admin/');
    driver.findElement(By.name('username')).sendKeys("admin");
    driver.findElement(By.name('password')).sendKeys("admin");
    driver.findElement(By.name('login')).click();


    //  driver.findElement(By.css("#app- > a")).click(); ///main menu
    driver.wait(until.elementLocated(By.css("div.logotype")), 10000); ///wait sub
    //driver.findElement(By.css("#app- > ul a")).click();  ///первый элемент подсписка


    var mainLinkStep = function(i) {
      driver.findElements(By.css("#app- > a")).then(function(links) {
        if (i >= links.length) {
          return;
        }
        console.log(i);
        links[i].getText().then(function(t) {
          console.log(t);
        });
        links[i].click();
        driver.wait(until.elementLocated(By.tagName('h1')), 10000);
        driver.wait(until.elementLocated(By.css("div.logotype")), 10000);
        ///
        var linkStep = function(i) {
          driver.findElements(By.css("#app- > ul a")).then(function(links) {
            if (i >= links.length) {
              return;
            }
            console.log(i);
            links[i].getText().then(function(t) {
              console.log(t);
            });
            links[i].click();
            driver.wait(until.elementLocated(By.css("div.logotype")), 10000);
            driver.wait(until.elementLocated(By.tagName("h1")), 10000);
            linkStep(i + 1);
          });
        };
        linkStep(0);
        mainLinkStep(i + 1);
      });
    };
    mainLinkStep(0);
  });

  test.after(function() {
    driver.quit();
  });
});
