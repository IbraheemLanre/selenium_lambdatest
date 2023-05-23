const {Builder, By, Key, Browser, Options} = require('selenium-webdriver')
const ltCapabilities = require('../capabilities')

var should = require('chai').should()

// describe block
describe('Add todo text', ()=>{
let driver;
    //username
    const USERNAME = ltCapabilities.capabilities['LT:Options'].username
    //key
    const KEY = ltCapabilities.capabilities["LT:Options"].accessKey
    //host
    const GRID_HOST = "hub.lambdatest.com/wd/hub"
    //url
    const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST
    const todoEndPoint = 'https://lambdatest.github.io/sample-todo-app/'


    /*beforeEach(function(){
        ltCapabilities.capabilities['LT:Options'].name=this.currentTest.title
    driver = new Builder()
    .usingServer(gridUrl)
    .withCapabilities(ltCapabilities.capabilities)
    .build()
    })*/

    /*afterEach(async()=>{
   await driver.quit()    
    })*/

    browsers = [
        {browser: "Chrome", bVersion:"113.0", os:"windows 11"},
        {browser: "Firefox", bVersion:"113.01", os:"windows 11"},
        {browser: "Firefox", bVersion:"112.0", os:"windows 11"},
    ]

    browsers.forEach(({browser, bVersion, os})=>{

    //it block
    it(`Successfully adds a todo for browser ${browser}, ${bVersion}, ${os}`, async()=>{

        ltCapabilities.capabilities.platformName = os
        ltCapabilities.capabilities.browserName = browser
        ltCapabilities.capabilities.browserVersion = bVersion
//        ltCapabilities.capabilities.name = this.test.title
        
        //launch the browser
        driver = new Builder()
        .usingServer(gridUrl)
        .withCapabilities(ltCapabilities.capabilities)
        .build()

        //navigate to our application
        await driver.get(todoEndPoint)
  
        // add a todo
        await driver.findElement(By.id('sampletodotext')).sendKeys('Learn Selenium', Key.RETURN)
    
        //assert 
        let todoText = await driver.findElement(By.xpath("//li[last()]")).getText().then(function(value){
            return value
        })
    
        //assert using chai should
        todoText.should.equal("Learn Selenium")

        await driver.quit()
        })
    })
})


