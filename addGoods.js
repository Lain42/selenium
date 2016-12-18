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

    driver.get('http://127.0.0.1/admin/');
    driver.findElement(By.name('username')).sendKeys("admin");
    driver.findElement(By.name('password')).sendKeys("admin");
    driver.findElement(By.name('login')).click();
    driver.findElement(By.xpath('//ul[@id="box-apps-menu"]/li[2]')).click().then(function() {
      driver.wait(until.elementLocated(By.id('doc-catalog')), 10000);
      driver.findElement(By.id('doc-catalog')).click().then(function() {
        driver.wait(until.elementLocated(By.xpath('//*[@id="content"]/div[1]/a[2]')), 10000);
        driver.findElement(By.xpath('//*[@id="content"]/div[1]/a[2]')).click();
        driver.wait(until.elementLocated(By.name('status')), 10000);
      });
    });
  });

  test.it('add Goods', function() {
    var goodsName = '42kotya42';
    ////General
    driver.findElement(By.xpath('//*[@id="tab-general"]/table/tbody/tr[1]/td/label[1]/input')).click();
    driver.findElement(By.name('name[en]')).sendKeys(goodsName);
    driver.findElement(By.name('code')).sendKeys("code");
    driver.findElement(By.name('quantity')).sendKeys("42");
    driver.findElement(By.name('date_valid_from')).sendKeys("01/05/2016");
    driver.findElement(By.name('date_valid_to')).sendKeys('01/05/2017');
    ////Information
    driver.findElement(By.css('#content > form > div > ul > li:nth-child(2) > a')).click().then(function() {
      driver.findElement(By.name('keywords')).sendKeys("keywords");
      driver.findElement(By.name('short_description[en]')).sendKeys("short_description[en]");
      driver.findElement(By.css('.trumbowyg-editor')).sendKeys('big story');
      driver.findElement(By.name('head_title[en]')).sendKeys('head_title[en]');
      driver.findElement(By.name('meta_description[en]')).sendKeys('meta_description[en]');
      // driver.findElement(By.name('confirmed_password')).sendKeys(pass);
    });
    driver.findElement(By.css('#content > form > div > ul > li:nth-child(4) > a')).click().then(function() {
      // driver.sleep(10000);
      driver.findElement(By.name('purchase_price')).sendKeys("42");
      driver.findElement(By.name('purchase_price_currency_code')).click().then(function() {
        driver.findElement(By.css('[value="USD"]')).click();
      });
      // driver.findElement(By.name('tax_class_id')).click().then(function(){
      //       driver.sleep(3000);
      //   driver.findElement(By.css('[value="1"]')).click();
      // });

      driver.findElement(By.name('prices[USD]')).sendKeys('42');
      driver.findElement(By.name('gross_prices[USD]')).sendKeys('5');
      driver.findElement(By.name('save')).click().then(function() {
        driver.sleep(3000);
        driver.findElement(By.partialLinkText(goodsName)).then(function(el) {
          assert(el.isDisplayed());
        }).catch(function(error) {
          assert(false);
        });

      });
    });
  });



  test.after(function() {
    driver.quit();
  });
});
