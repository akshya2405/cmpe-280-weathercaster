import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

const TEST_URL = 'http://54.219.176.161:3000/weathercaster';

describe('multiple selenium tests', async function () {
  afterAll(async function () {
    await driver.quit();
  });

  it('check title', (done) => {
    driver.get(TEST_URL).then(function () {
      driver.findElement(webdriver.By.name('searchString')).sendKeys('London\n').then(function () {
        driver.getTitle().then(function (title) {
          console.log(title)
          if (title === 'Weathercaster - A CMPE280 Project') {
            console.log('Test passed');
          } else {
            console.log('Test failed');
          }
          done();
        });
      });
    });
  })

  it('search for london weather', (done) => {
    driver.get(TEST_URL).then(function () {
      driver.findElement(webdriver.By.name('searchString')).sendKeys('London\n').then(function () {
        driver.getCurrentUrl().then(function (url) {
          console.log(url);
          if (url === TEST_URL + '/search/today?searchString=London') {
            console.log('Test passed');
          } else {
            console.log('Test failed');
          }
          done();
        })
      });
    });
  });

  it('search from today page', (done) => {
    driver.get(TEST_URL).then(function () {
      driver.findElement(webdriver.By.name('searchString')).sendKeys('London\n').then(function () {
        driver.findElement(webdriver.By.id('navbar-input')).sendKeys('Chennai\n').then(function () {
          driver.getCurrentUrl().then(function (url) {
            console.log(url);
            if (url === TEST_URL + '/search/today?') {
              console.log('Test passed');
            } else {
              console.log('Test failed');
            }
            done();
          })
        })
      });
    });
  });

  it('change to celcius', (done) => {
    driver.get(TEST_URL).then(function () {
      driver.findElement(webdriver.By.name('searchString')).sendKeys('London\n').then(function () {
        driver.findElement(webdriver.By.id('celsius')).click().then(async function () {
          let element = await driver.findElement(webdriver.By.id('unit')).getText();
          console.log(element);
          if (element === '℃') {
            console.log('Test passed');
          } else {
            console.log('Test failed');
          }
          done();
        })
      });
    });
  });

  it('navbar change', (done) => {
    driver.get(TEST_URL).then(function () {
      driver.findElement(webdriver.By.name('searchString')).sendKeys('London\n').then(function () {
        driver.findElement(webdriver.By.linkText('Hourly')).click().then(async function () {
          driver.getCurrentUrl().then(function (url) {
            console.log(url);
            if (url === TEST_URL + '/search/hourly') {
              console.log('Test passed');
            } else {
              console.log('Test failed');
            }
            done();
          })
        })
      });
    });
  });

})