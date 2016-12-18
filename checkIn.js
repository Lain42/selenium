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

    driver.get('http://localhost/create_account');
  });

  test.it('checkIN test', function() {

    var pass = 'qwerty';
    var mail = 'mail987Heavy@mail.io';

    driver.findElement(By.name('tax_id')).sendKeys("tax_id");
    driver.findElement(By.name('company')).sendKeys("company");
    driver.findElement(By.name('firstname')).sendKeys("firstname");
    driver.findElement(By.name('lastname')).sendKeys("lastname");
    driver.findElement(By.name('address1')).sendKeys("address1");
    driver.findElement(By.name('address2')).sendKeys("address2");
    driver.findElement(By.name('postcode')).sendKeys("36310");
    driver.findElement(By.name('city')).sendKeys("city");
    driver.findElement(By.name('email')).sendKeys(mail);
    driver.findElement(By.name('phone')).sendKeys('1234567');
    driver.findElement(By.name('password')).sendKeys(pass);
    driver.findElement(By.name('confirmed_password')).sendKeys(pass);

    driver.findElement(By.name('create_account')).click();

    driver.wait(until.elementLocated(By.css('#box-account > div > ul > li:nth-child(4) > a')), 10000);

    driver.findElement(By.css('#box-account > div > ul > li:nth-child(4) > a')).click();
    driver.wait(until.elementLocated(By.name('email')), 10000);

    driver.findElement(By.name('email')).sendKeys(mail);
    driver.findElement(By.name('password')).sendKeys(pass);
    driver.findElement(By.name('login')).click();
    driver.findElement(By.css('#box-account > div > ul > li:nth-child(4) > a')).click();
    driver.wait(until.elementLocated(By.css('#box-account > div > ul > li:nth-child(4) > a')), 10000);
  });



  test.after(function() {
    driver.quit();
  });
});
