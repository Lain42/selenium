var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('add goods to cart/ check cart', function() {
    var driver;

    test.before(function () {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.manage().timeouts().implicitlyWait(10000/*ms*/);
        driver.get('http://localhost/');
    });

    test.it('Add Product too cart', function () {
        for(var i=1; i<4; i++){
            driver.findElement(By.css('#box-most-popular .product')).click();
            var count = driver.findElement(By.css('.quantity'));
            driver.findElement(By.css('[name=add_cart_product]')).click();
           driver.wait(until.elementTextIs(count, i.toString()), 3000/*ms*/);
            driver.get('http://localhost/');
        }
        driver.findElement(By.css('#cart [class=link]')).click();
        driver.findElements(By.css('td.sku')).then(function(list){
            for(var i=0; i<list.length; i++){
                var x = driver.findElement(By.css('.dataTable'));
                driver.findElement(By.css('[name="remove_cart_item"]')).click();
                driver.wait(until.stalenessOf(x),  3000/*ms*/);
            }
        });
    });

    test.after(function() {
        driver.quit();
    });
});
