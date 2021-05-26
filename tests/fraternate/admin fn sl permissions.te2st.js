//jest -t 'adminfnslpermissions'
/*
const { Builder, By, Key, until } = require('selenium-webdriver')
require('selenium-webdriver/chrome')
var fs = require('fs')

require('chromedriver')


const rootURL = 'http://localhost:5000/'
const d = new Builder().forBrowser('chrome').build()
const waitUntilTime = 20000
let driver, el, actual, expected
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

async function getElementById(id) {
  const el = await driver.wait(until.elementLocated(By.id(id)), waitUntilTime)
  return await driver.wait(until.elementIsVisible(el), waitUntilTime)
}
async function getElementByXPath(xpath) {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), waitUntilTime)
  return await driver.wait(until.elementIsVisible(el), waitUntilTime)
}

it.skip('adminfnslpermissions waits for the driver to start', () => {
  return d.then(_d => {
    driver = _d
  })
})


test.skip('adminfnslpermissions find element not logged in.', async () => {
  await driver.get(rootURL+'permissions')
  expect(await driver.findElement(By.id('notloggedin')).isDisplayed()).toBeTruthy();
})

test.skip('adminfnslpermissions find element bypassed user login.', async () => {
  await driver.get(rootURL+'permissions/?testing=true')
  expect(await driver.findElement(By.id('inviteMember_org')).isDisplayed()).toBeTruthy();
})
test.skip('adminfnslpermissions find element bypassed user login.', async () => {
  await driver.get(rootURL+'permissions/?testing=true')
  expect(await driver.findElement(By.id('inviteMember')).isDisplayed()).toBeTruthy();
})


test.skip('adminfnslpermissions delete a user.', async () => {
  await driver.get(rootURL+'organizations/shiftbulk/settings/member_privileges/?testing=true')
  await driver.findElement(By.css('i.fa-trash-alt')).click();
  await driver.wait(until.alertIsPresent());
  let alert = await driver.switchTo().alert();
  let alertText = await alert.getText();
  await alert.accept();
})



*/

 /*
//step 1 get the role of KaraboMogotlane
test.skip('adminfnslpermissions get the role of KaraboMogotlane.', async () => {
  await driver.get(rootURL+'organizations/shiftbulk/settings/member_privileges/?testing=true')
 
  //let test = await driver.findElement(By.xpath("//*[text()='Member Privileges']"));
  //let test = await driver.findElement(By.xpath("//div[@id='5d846432b0bd9f0004f40bb8_userrow']"));
  //let test = await driver.findElement(By.xpath("//div[@id='5d846432b0bd9f0004f40bb8_username_org']"));
  //let test = await driver.wait(until.elementLocated(By.css("dummy")), 10000)
  //let test = await driver.wait(until.elementLocated(By.xpath("//div[@id='5d846432b0bd9f0004f40bb8_username_org']")), 10000)
  //let test = await driver.wait(until.elementLocated(By.xpath("//*[text()='Collaborative Online Conveyor Design']")), 10000)
  let test = await driver.wait(until.elementLocated(By.xpath("//*[@id='testidforthisdiv']")), 10000).getText();
  let test1 = await driver.wait(until.elementLocated(By.id("testidforthisdiv")), 10000)
  let test2 = await driver.findElement(By.xpath("//*[@id='testidforthisdiv']"));
  let test3 = await driver.findElement(By.xpath("//div[@id='testidforthisdiv']"));
  let test4 = await driver.findElement(By.xpath("(//div[@id='testidforthisdiv'])[1]"));
  let test5 = await driver.findElement(By.id("testidforthisdiv"));
  console.log(test1.text)
  console.log(test2.text)
  console.log(test3.text)
  console.log(test4.text)
  console.log(test5.text)
test.then((text) => {
    console.log(text,'ffffffffff')
});


var textPromise = driver.findElement(By.id("5d846432b0bd9f0004f40bb8_userrow")).getAttribute('data-role');
await textPromise.then((text) => {
  console.log(text);
});
*/

/*
var promise = require('selenium-webdriver').promise;
var pendingElements = driver.findElements(By.className('btn'))
await pendingElements.then(function (elements) {
    var pendingHtml = elements.map(function (elem) {
        return elem.getText();
    });
    promise.all(pendingHtml).then(function (allHtml) {
        // `allHtml` will be an `Array` of strings
        console.log(allHtml)
    });
});

var promise = require('selenium-webdriver').promise;
var pendingElements = driver.findElements(By.className('fa-trash-alt'))
var pendingHtml = []
await pendingElements.then(function (elements) {
   pendingHtml = elements.map(function (elem) {
    console.log(pendingHtml,'pendingHtml')
    console.log(elem,'elem')
    console.log(elem.text,'elem.text')
    console.log(elem.getText(),'elem.getText()')
    //console.log(elements,'elements')
     return elem;
  })

}).then(function (text) {
        for (var i = 0; i < pendingHtml.length; i++) {
          //console.log((text.getText()))
          console.log((text))
        }
})

function mapValues(values){
  var pendingHtml = values.map(function (elem) {
   // elem=elem.getText();
    return elem;
  })
  return pendingHtml
}
function loglist(values){
  console.log(values)
}
 
await driver.findElements(By.className('fa-trash-alt'))
.then(await mapValues(result))
.then(loglist())

})

*/


 /*
it(' working screen grab', async () => {
  await driver.get(rootURL)
  await driver.takeScreenshot().then(function(data){
  //  fs.writeFileSync('./tests/img/img.png',data,'base64')
})
})



/testing console.log not working
test('adminfnslpermissions get contents of the console in chrome.', async () => {
await driver.get(rootURL+'permissions/?testing=true')
//append a div to the body of the page
await driver.executeScript("var div = document.createElement('div'); div.id = 'console_log'; document.body.appendChild(div);");
//override console.log to write the log message to the new div          
await driver.executeScript("console.log = function(message){document.getElementById('console_log').innerHTML += message}");
//get the contents of the new div
const console_log = await driver.findElement(By.id('console_log'));
console.log(await console_log.getAttribute('innerHTML'));
})


working delete user
test('adminfnslpermissions delete a user.', async () => {
await driver.get(rootURL+'permissions/?testing=true')
await driver.findElement(By.css('i.fa-trash-alt')).click();
await driver.wait(until.alertIsPresent());
let alert = await driver.switchTo().alert();
let alertText = await alert.getText();
await alert.accept();
})


 trying to get the modal to work , no success
test('adminfnslpermissions click invite user.', async () => {
  await driver.get(rootURL+'permissions/?testing=true')
  //append a div to the body of the page
  await driver.findElement(By.id('inviteMember_org')).click();
  // await driver.executeScript("document.getElementById('searchThisHere_org').setAttribute('value','kara')")
let firstResult3 = await driver.wait(until.elementLocated(By.xpath("(//div[@id='finduserModal_org']//div[@class='modal-dialog']//div[@class='modal-content']//div[@class='modal-body']//input[@id='searchThisHere_org'])[1]")), 10000).sendKeys('cheese', Key.ENTER);
})



test('adminfnslpermissions click invite user.1', async () => {
  await driver.get(rootURL+'permissions/?testing=true')
  //append a div to the body of the page
  await driver.findElement(By.id('inviteMember_org')).click();
  // await driver.executeScript("document.getElementById('searchThisHere_org').setAttribute('value','kara')")
let firstResult3 = await driver.wait(until.elementLocated(By.xpath("(//div[@id='finduserModal_org']//div[@class='modal-dialog']//div[@class='modal-content']//div[@class='modal-body']//input[@id='searchThisHere_org'])[1]")), 10000)
console.log(firstResult3)
})
test('adminfnslpermissions click invite user.2', async () => {
  await driver.get(rootURL+'permissions/?testing=true')
  //append a div to the body of the page
  await driver.findElement(By.id('inviteMember_org')).click();
      //Click Launch Modal
        let launchModal = await driver.wait(until.elementLocated(By.id('closeOrgBtn')))
        launchModal = await driver.wait(until.elementIsVisible(launchModal))
        await launchModal.click()
})


test('adminfnslpermissions click invite user.2', async () => {
  await driver.get(rootURL+'permissions/?testing=true')
 
   await driver.findElement(By.id('inviteMember_org')).click()
        let closeButton1 = await driver.wait(until.elementLocated(By.id('closeOrgBtn')))
        closeButton1 = await driver.wait(until.elementIsVisible(closeButton1))
        await closeButton1.click()
})
*/



/*
afterAll(async () => {
  await driver.quit();
}, 15000);
*/