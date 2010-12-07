$(document).ready(function(){
  
  module("JSON Ref");
  
  test("fromRefJson", function(){
    var d = new Date();
    var testStr = '{a:{$ref:"#"},id:"root",c:{d:"e",f:{$ref:"root.c"}},b:{$ref:"#.c"},"an array":["a string"],"a string":{$ref:"#an array.0"}}';

    var mirrorObj = jQuery.fromJsonRef(testStr);

    ok(mirrorObj === mirrorObj.a);
    ok(mirrorObj.c === mirrorObj.c.f);
    ok(mirrorObj.c === mirrorObj.b);
    ok(mirrorObj["a string"] === "a string");
  });
  
  test("toAndFromRefJson", function(){
    var testObj = {a:{},b:{"has space":{}}};
    testObj.a.d= testObj;

    var arrayItem = testObj.array = [{}];
    arrayItem[1] = arrayItem[0];

    testObj.b.g=testObj.a;
    testObj.b["has space"].f = testObj.b;
    testObj.b.h=testObj.a;

    var mirrorObj = jQuery.fromJsonRef(jQuery.toJsonRef(testObj));
    
    ok(mirrorObj.a.d === mirrorObj);
    ok(mirrorObj.b.g === mirrorObj.a);
    ok(mirrorObj.b["has space"].f === mirrorObj.b);
    ok(mirrorObj.b.h === mirrorObj.a);
    ok(mirrorObj.array[0] === mirrorObj.array[1]);
  });
  
  test("secondLevelLazy", function() {
    var testStr = '[{$ref:1,foo:"bar"},{$ref:2, me:{$ref:2},first:{$ref:1}}]';
    var mirrorObj = jQuery.fromJsonRef(testStr);
    equal(mirrorObj[0].foo,"bar");
    ok(mirrorObj[1] === mirrorObj[1].me);
    ok(mirrorObj[0] === mirrorObj[1].first);
  });
  
});