const {Builder, By, Key, Browser} = require('selenium-webdriver')
var should = require('chai').should()


// describe block
describe('Add a todo text', ()=>{
    //it block
    it('Successfully adds another todo to the application', async()=>{

        //load the browser
        let driver = await new Builder().forBrowser(Browser.FIREFOX).build()
    
        //navigate to our application
        await driver.get('https://lambdatest.github.io/sample-todo-app/')
    
        // add a todo
        await driver.findElement(By.id('sampletodotext')).sendKeys('Learn Selenium', Key.RETURN)
    
        //assert 
        let todoText = await driver.findElement(By.xpath("//li[last()]")).getText().then(function(value){
            return value
        })
    
        //assert using chai should
        todoText.should.equal("Learn Selenium")
    
        //close the browser
        await driver.quit()    
    })
})



