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

    driver.get('http://localhost/campaigns-c-1/');
  });

  test.it('check sort countries in list - main page', function() {
    var nameGoods = driver.findElement(By.css('.name')).getText();
    var regularPrice = driver.findElement(By.css('.regular-price')).getText();
    var regularPriceCSSColor = driver.findElement(By.css('.regular-price')).getCssValue("color");

    var campaignPrice = driver.findElement(By.css('.campaign-price')).getText();
    var campaignPriceCSSColor = driver.findElement(By.css('.regular-price')).getCssValue("color");


    driver.findElement(By.css('.name')).click();
    driver.wait(until.elementLocated(By.css('[itemprop="name"]')), 10000);
    
    assert.deepEqual(driver.findElement(By.css('[itemprop="name"]')).getText(), nameGoods, 'nameGoods not equal');

    assert.deepEqual(driver.findElement(By.css('.regular-price')).getText(), regularPrice, 'regular-price not equal');
    assert.deepEqual(driver.findElement(By.css('.campaign-price')).getText(), campaignPrice, 'campaign-price not equal');

    assert.deepEqual(driver.findElement(By.css('.regular-price')).getCssValue("color"), regularPriceCSSColor, 'regular-price css not equal');
    assert.deepEqual(driver.findElement(By.css('.campaign-price')).getCssValue("color"), campaignPriceCSSColor, 'campaign-price css not equal');




  });



  test.after(function() {
    driver.quit();
  });
});
