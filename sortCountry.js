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
    driver.getCapabilities().then(function(caps) {

    });
    // login
    driver.get('http://localhost/admin/?app=countries&doc=countries');
    driver.findElement(By.name('username')).sendKeys("admin");
    driver.findElement(By.name('password')).sendKeys("admin");
    driver.findElement(By.name('login')).click();

    driver.wait(until.elementLocated(By.css("div.logotype")), 10000); ///wait sub
  });

  test.it('check sort countries in list - main page', function() {

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
  /////
  test.it('regions order', function() {

    var linkStep = function(i) {
      driver.findElements(By.xpath('//table[@class="dataTable"]/*/tr[@class="row"][td[6]/text() != "0"]/td[5]/a')).then(function(links) {
        console.log(links);
        if (i >= links.length) {

          return;
        }
        console.log(i);
        links[i].getText().then(function(t) {
          console.log(t);
        });
        links[i].click();
        driver.wait(until.elementLocated(By.css("div.logotype")), 10000);
        //      driver.wait(until.elementLocated(By.tagName("h1")), 10000);



        driver.findElements(By.css('.dataTable td:nth-child(6) a')).then(function(elLink) {
          elLink.forEach(function(element) {
            console.log(element);
            element.click();
            driver.wait(until.elementLocated(By.css("div.logotypes")), 10000); ///wait sub

            var resultArrTimes = [];
            driver.findElements(By.css('.dataTable td:nth-child(5) a')).then(function(elArr) {
              elArr.forEach(function(element) {
                element.getText().then(function(text) {
                  resultArr.push(text);
                });
              });
            }).then(function() {
              var sortedTimes = resultArrTimes.slice().sort();
              assert.deepEqual(sortedTimes, resultArrTimes, "not sorted );");
            });

          });

        });

        //
        driver.get('http://localhost/admin/?app=countries&doc=countries');
        linkStep(i + 1);
      });
    };

    linkStep(0);
  });

  //  });

  test.after(function() {
    driver.quit();
  });
});
