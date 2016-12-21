var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');


test.describe('login litecart', function() {
    var driver;

    test.before(function () {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.manage().timeouts().implicitlyWait(10000/*ms*/);
        driver.get('http://localhost/admin/?app=countries&doc=countries');
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click();
    });

    test.it('Open windows check', function() {
        driver.findElement(By.css('form[name=countries_form] tr td a')).click();
        driver.getWindowHandle().then(function(mainwin){
            return Promise.all([mainwin, driver.findElements(By.css('.fa-external-link'))]);
        }).then(function(data){
            var mainwin = data[0];
            var linkList = data[1];
            for(var i=0; i<linkList.length; i++){
                linkList[i].click();

                driver.getAllWindowHandles().then(function(winlist){
                    winlist.splice(winlist.indexOf(mainwin), 1);
                    var tabwin = winlist.pop();
                    driver.switchTo().window(tabwin);
                    driver.close();
                    driver.switchTo().window(mainwin);
                });
            }
        });
    });

    test.after(function() {
        driver.quit();
    });
});
