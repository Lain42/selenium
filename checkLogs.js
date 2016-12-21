var
  webdriver = require('selenium-webdriver'),
  chrome = require('selenium-webdriver/chrome'),
  promise = require('selenium-webdriver/lib/promise'),
  By = webdriver.By,
  until = webdriver.until,
  test = require('selenium-webdriver/testing'),
  assert = require('assert');

test.describe('Check logs', function() {
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

    driver.get('http://localhost/admin/?app=catalog&doc=catalog&category_id=1');
    driver.findElement(By.name('username')).sendKeys("admin");
    driver.findElement(By.name('password')).sendKeys("admin");
    driver.findElement(By.name('login')).click();
  });

  test.it('logsEntries', function() {
    driver.wait(until.elementLocated(By.css("div.logotype")), 10000); ///wait sub


    var linkStep = function(i) {
      driver.get('http://localhost/admin/?app=catalog&doc=catalog&category_id=1');
      driver.findElements(By.xpath('//form[@name="catalog_form"]/table[@class="dataTable"]/*/tr[contains(td[3]/a/@href, "category_id=1") and contains(td[3]/a/@href, "product_id=")]/td[3]/a')).then(function(links) {
        if (i >= links.length) {
          return;
        }
        console.log(i);
        links[i].getText().then(function(t) {
          console.log(t);
        });
        links[i].click();
        driver.wait(until.elementLocated(By.css("div.logotype")), 10000);
        driver.manage().logs().get("browser").then(function(logsEntries) {
          assert.deepEqual(logsEntries, [], "logsEntries not empty );");
        });

        linkStep(i + 1);
      });
    };
    linkStep(0);

  });

  test.after(function() {
    driver.quit();
  });
});
