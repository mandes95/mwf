/**
 * Unit tests for mwf.userAgent
 *
 * @author trott
 * @copyright Copyright (c) 2010-11 UC Regents
 * @license http://mwf.ucla.edu/license
 * @version 20111102
 *
 * @requires mwf
 * @requires mwf.userAgent
 * @requires qunit
 * 
 */

module("core/useragent.js"); 
            
test("mwf.userAgent.getOS()", function()
{
    var os = mwf.userAgent.getOS();
    
    ok(typeof os === 'string','getOS() should return a string');
    
    var expected_results = ['iphone_os', 'android','blackberry','windows phone os','windows mobile',
    'symbian','webos','mac os x','windows nt','linux', ''];
    
    ok(expected_results.indexOf(os) > -1, 'getOS() should be expected value: ' + os);
});

test("mwf.userAgent.getOSVersion()", function()
{
    var osVersion = mwf.userAgent.getOSVersion();
    
    ok(typeof osVersion === 'string','getOSVersion() should return a string');
});

test ("mwf.userAgent.getOSVersion() for iPad running iOS 5.1", function()
{
    var oldNav = navigator;
    navigator = {
        'userAgent':'Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3'
    };
    var ua = new mwf.userAgent.constructor();
    equal(ua.getOSVersion(), "5.1", "getOSVersion() should parse iOS 5.1 userAgent string");

test("mwf.userAgent.getOSVersion() for iPhone", function()
{
    var oldNav = navigator;
    navigator = {
        'userAgent':'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5'
    };
    var ua = new mwf.userAgent.constructor();
    equal(ua.getOSVersion(),"4.3.3","getOSVersion() should parse iOS 4.3.3 userAgent string");
    navigator = oldNav;
});

test("mwf.userAgent.getOSVersion() for Blackberry 7.0", function()
{
    var oldNav = navigator;
    navigator = {
        'userAgent':'Mozilla/5.0 (BlackBerry; U; BlackBerry 9860; en-GB) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.296 Mobile Safari/534.11+'
    };
    var ua = new mwf.userAgent.constructor();
    equal(ua.getOSVersion(),"7.0.0.296","getOSVersion() should parse Blackberry 7.0.0.296 userAgent string");
    navigator = oldNav;
});

test("mwf.userAgent.getOSVersion() for Blackberry 5.0", function()
{
    var oldNav = navigator;
    navigator = {
        'userAgent':'BlackBerry9650/5.0.0.732 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/105'
    };
    var ua = new mwf.userAgent.constructor();
    equal(ua.getOSVersion(),"5.0.0.732","getOSVersion() should parse Blackberry 5.0.0.732 userAgent string");
    navigator = oldNav;
});

test("mwf.userAgent.getBrowser()", function()
{
    var browser = mwf.userAgent.getBrowser();
    
    ok(typeof browser === 'string','getBrowser() should return a string');
    
    var expected_results = ['android_webkit', 'safari', 'chrome', 'iemobile', 'camino', 
    'seamonkey', 'firefox', 'opera_mobi', 'opera_mini', ''];
    
    ok(expected_results.indexOf(browser) > -1, 'getBrowser() should be expected value: ' + browser);
});

test("mwf.userAgent.getBrowserEngine()", function()
{
    var browserEngine = mwf.userAgent.getBrowserEngine();
    
    ok(typeof browserEngine === 'string','getBrowserEngine() should return a string');
    
    var expected_results = ['webkit', 'trident', 'gecko', 'presto', 'khtml', ''];
    
    ok(expected_results.indexOf(browserEngine) > -1, 'getBrowserEngine() should be expected value: ' + browserEngine);
    
    var saveNavigator = navigator;
    navigator = new Object();
    navigator.__proto__ = saveNavigator;
    Object.defineProperty(navigator, 'userAgent', {
        get: function() {
            return "unknown user agent";
        }
    });
var newUserAgent = new mwf.userAgent.constructor;
var newBrowserEngine = newUserAgent.getBrowserEngine();

    strictEqual(newBrowserEngine, '', 'Unknown user agent should result in empty browserEngine: ' + newBrowserEngine);

    navigator = saveNavigator;
});

test("mwf.userAgent.getBrowserEngineVersion()", function()
{
    var browserEngineVersion = mwf.userAgent.getBrowserEngineVersion();
    
    ok(typeof browserEngineVersion === 'string','getBrowserEngineVersion() should return a string');
});

test("mwf.userAgent.generateCookieContent()", function()
{   
    var re = /^\{\"s\":\".*\",\"os\":\".*\",\"osv\":\".*",\"b\":\".*\",\"be\":\".*\",\"bev\":\".*\"\}$/;
    var cookie = mwf.userAgent.generateCookieContent();
    ok(re.exec(cookie), 'cookie should be in expected format');
});