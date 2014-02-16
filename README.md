4hourCodingChallenge
====================

Some coding challenges to improve your programming skill

I want to be a better developer. In order to be that, I believe practicing different tasks are vital. At the same time, my time is precious, so timeboxing the practice might be a good idea.

So that's why I created this little challenge - What kind of code can I produce that is interesting and that I learn something from in four hours?

Challenge #1 - Svg Tetris
=========================
Create a working tetris clone using Javascript. Use Svg for graphics rendering. Do as much as you can in four hours.
Use no more than 4 hours. Publish your work and tell [@aspelund](http://twitter.com/aspelund) about it.

Challenge #2 - Javascript Linq Framework
========================================
Create a framework that implements the Linq framework. Using [101 Linq examples](http://code.msdn.microsoft.com/101-LINQ-Samples-3fb9811b) tests are written in qunit that covers some of the usage.

After 4 hours of coding, parts of select, where, skip, skipWhile, take, takeWhile, orderBy and thenBy was implemented. The result can be found in (jslinq.js)[https://github.com/aspelund/4hourCodingChallenge/blob/master/javascript_linq/js/jslinq.js].

Some examples: 
```javascript
    test("from should return linq-object containing a n object", function(){
        var linq = new JsLinq();
        var numbers = [5,4,1,3,9,8,6,7,2,0];
        equal(linq.n1, numbers);
    });
    
    test("select should return array object", function(){
        var linq = new JsLinq();
        var numbers = [5,4,1,3,9,8,6,7,2,0];
        var res = linq.from('n2', numbers).
                select('n2', function(n){            
            return n;
        }).toArray();             
        deepEqual(res, numbers);
    });
    test("select should return array with increased values", function(){
        var linq = new JsLinq();
        var numbers = [5, 4, 1, 3, 9, 8, 6, 7, 2, 0];
        var res = linq.from('n3', numbers).
                       select('n3', function(n){
            return (1 + n);
        }).toArray();       
        deepEqual(res, [6,5,2,4,10,9,7,8,3,1]);
    });
    
    test("select should return added values", function(){
       var linq = new JsLinq();
       var res = linq.from('a', [1,2,3]).
               from('b', [4,5,6]).
               select('a', 'b', function(a,b){
                   return a+b;
               }).toArray();
        deepEqual(res, [5,7,9]);               
    });
    
    test("should return object with uppercase and lowercase strings", function(){
       var linq = new JsLinq();
        var words = [ "aPPLE", "BlUeBeRrY", "cHeRry" ]; 
        var res = linq.from('word', words).
                      select('word', function(word){
           return {upper:word.toUpperCase(), lower:word.toLowerCase()};         
        }).toArray();
        equal(res[1].lower, 'blueberry');
        equal(res[2].upper, 'CHERRY');
    });
    
    test('should filter numbers below 5', function(){
        var linq = new JsLinq();
        var numbers = [5, 4, 1, 3, 9, 8, 6, 7, 2, 0];
        var res = linq.from('n', numbers).
                where('n', function(n){
                   return n<5; 
                }).
                select('n', self).toArray();        
        deepEqual(res, [4,1,3,2,0]);
    });
    
    test('should return objects where filter by customers orders are smaller than 500', function(){
       var linq = new JsLinq();
       var customers = [
           {CustomerID:1, Orders:[
                   {OrderID:2,Total:300}, 
                   {OrderID:3, Total:700}, 
                   {OrderID:5, Total:250}]
           },{CustomerID:6, Orders:[
                   {OrderID:7,Total:301}, 
                   {OrderID:8, Total:702}, 
                   {OrderID:9, Total:253}]
           },{CustomerID:10, Orders:[
                   {OrderID:11,Total:304}, 
                   {OrderID:12, Total:705}, 
                   {OrderID:13, Total:256}]
           } ];
        var res = linq.from('c', customers).
                from('o', 'c.Orders').
                where('c', 'o', function(c, o){
                    return o.Total<500;         
                }).
                select('c', 'o', function(c,o){
                    return {CustomerID:c.CustomerID, OrderID:o.OrderID, Total:o.Total};
                }).toArray();
        equal(res[2].Total, 301);
        equal(res[4].CustomerID, 10);
        equal(res[5].OrderID, 13);
    });    

    test('should do multiple filters', function(){
       var linq = new JsLinq();
       var customers = [
           {CustomerID:1, Region:"Wa", Orders:[
                   {OrderID:2,Total:300}, 
                   {OrderID:3, Total:700}, 
                   {OrderID:5, Total:250}]
           },{CustomerID:6, Region:"NY", Orders:[
                   {OrderID:7,Total:301}, 
                   {OrderID:8, Total:702}, 
                   {OrderID:9, Total:253}]
           },{CustomerID:10, Region:"WI", Orders:[
                   {OrderID:11,Total:304}, 
                   {OrderID:12, Total:705}, 
                   {OrderID:13, Total:256}]
           } ];
        var res = linq.from('c', customers).
                where('c', function(c){
                    return c.Region == "Wa";
                }).
                from('o', 'c.Orders').
                where('c', 'o', function(c, o){
                    return o.Total<500;         
                }).
                select('c', 'o', function(c,o){
                    return {CustomerID:c.CustomerID, OrderID:o.OrderID, Total:o.Total};
                }).toArray();

        equal(res[0].Total, 300);
        equal(res[0].CustomerID, 1);
        equal(res[1].OrderID, 5);
    });    

    test('should have index to play with if given in from statement', function(){
       var linq = new JsLinq(); 
       var customers = [
           {CustomerID:1, Region:"Wa", Orders:[
                   {OrderID:2,Total:300}, 
                   {OrderID:3, Total:700}, 
                   {OrderID:5, Total:250}]
           },{CustomerID:6, Region:"NY", Orders:[
                   {OrderID:7,Total:301}, 
                   {OrderID:8, Total:702}, 
                   {OrderID:9, Total:253}]
           },{CustomerID:10, Region:"WI", Orders:[
                   {OrderID:11,Total:304}, 
                   {OrderID:12, Total:705}, 
                   {OrderID:13, Total:256}]
           } ];
       var res = linq.from('c', 'cIndex', customers)
               .select('c', 'cIndex', function(c, cIndex){
                   return "Customer " + cIndex + " comes from region " + c.Region;
               }).toArray();
       equal(res[2], "Customer 2 comes from region WI");       
    });
    
    test('can use index to get some indexes too', function(){
       var linq = new JsLinq();
       var numbers = [2,4,6,8,10,12,14,16];
       var res = linq.from('n','i', numbers).
               where('n','i', function(n, i){
                  return i>1 && i<4; 
               }).select('n', self).toArray();
       deepEqual(res, [6,8]);
    });

    test("select should take 3 first objects", function(){
        var linq = new JsLinq();
        var numbers = [5,4,1,3,9,8,6,7,2,0];
        var res = linq.from('n2', numbers).
                select('n2', function(n){            
            return n;
        }).take(3).toArray();             
        deepEqual(res, [5,4,1]);
    });
    
    test("select should skip 5 first objects", function(){
        var linq = new JsLinq();
        var numbers = [5,4,1,3,9,8,6,7,2,0];
        var res = linq.from('n2', numbers).
                select('n2', function(n){            
            return n;
        }).skip(5).toArray();             
        deepEqual(res, [8,6,7,2,0]);
    });
    
    test("should take while numbers < 9", function(){
        var linq = new JsLinq();
        var numbers = [5,4,1,3,9,8,6,7,2,0];
        var res = linq.from('n2', numbers).
                select('n2', function(n){            
            return n;
        }).takeWhile(function(n2){
            return n2<9;
        }).toArray();             
        deepEqual(res, [5,4,1,3]);
    });
    test("should skip while numbers < 9", function(){
        var linq = new JsLinq();
        var numbers = [5,4,1,3,9,8,6,7,2,0];
        var res = linq.from('n2', numbers).
                select('n2', self).
                skipWhile(function(n2){
                    return n2<9;
                }).toArray();             
        deepEqual(res, [9,8,6,7,2,0]);
    });    
    test('should take while Region<>WI', function(){
       var linq = new JsLinq(); 
       var customers = [
           {CustomerID:1, Region:"Wa", Orders:[
                   {OrderID:2,Total:300}, 
                   {OrderID:3, Total:700}, 
                   {OrderID:5, Total:250}]
           },{CustomerID:6, Region:"NY", Orders:[
                   {OrderID:7,Total:301}, 
                   {OrderID:8, Total:702}, 
                   {OrderID:9, Total:253}]
           },{CustomerID:10, Region:"WI", Orders:[
                   {OrderID:11,Total:304}, 
                   {OrderID:12, Total:705}, 
                   {OrderID:13, Total:256}]
           } ];
       var res = linq.from('c', 'cIndex', customers)
               .select('c', self).
               takeWhile(function(c){
                   return c.Region!=='WI';
                }).
                toArray();        
       equal(res[1].CustomerID, 6);
    });    
    test('should skip while Region==Wa', function(){
       var linq = new JsLinq(); 
       var customers = [
           {CustomerID:1, Region:"Wa", Orders:[
                   {OrderID:2,Total:300}, 
                   {OrderID:3, Total:700}, 
                   {OrderID:5, Total:250}]
           },{CustomerID:6, Region:"NY", Orders:[
                   {OrderID:7,Total:301}, 
                   {OrderID:8, Total:702}, 
                   {OrderID:9, Total:253}]
           },{CustomerID:10, Region:"WI", Orders:[
                   {OrderID:11,Total:304}, 
                   {OrderID:12, Total:705}, 
                   {OrderID:13, Total:256}]
           } ];
       var res = linq.from('c', 'cIndex', customers)
               .select('c', self).
               skipWhile(function(c){
                   return c.Region==='Wa';
                }).
                toArray();        
       equal(res[1].CustomerID, 10);
    });        
    
    test('should order strings', function(){
        var linq = new JsLinq();
        var animals = ["dog", "cat", "monkey"];
        var res = linq.from('a', animals).
                select('a', self).
                orderBy(self).toArray();
        deepEqual(res, ["monkey", "dog", "cat"]);        
    });
    
    test('should order by order total', function(){
       var linq = new JsLinq(); 
       var customers = [
           {CustomerID:1, Region:"Wa", Orders:[
                   {OrderID:2,Total:300}, 
                   {OrderID:3, Total:700}, 
                   {OrderID:5, Total:250}]
           },{CustomerID:6, Region:"NY", Orders:[
                   {OrderID:7,Total:301}, 
                   {OrderID:8, Total:702}, 
                   {OrderID:9, Total:253}]
           },{CustomerID:10, Region:"WI", Orders:[
                   {OrderID:11,Total:304}, 
                   {OrderID:12, Total:705}, 
                   {OrderID:13, Total:256}]
           } ];    
       var res = linq.from('c', customers).
               from('o', 'c.Orders').
               select('c', 'o', function(c,o){
                   return {CustomerID:c.CustomerID, order:o};
               }).orderBy(function(c){                   
                  return c.order.Total;
               }).toArray();
       equal(res[0].order.Total, 705);
       equal(res[8].order.Total, 250);
   });
   
    test('should order by order total then by region', function(){
       var linq = new JsLinq(); 
       var customers = [
           {CustomerID:1, Region:"Wa", Orders:[
                   {OrderID:2,Total:300}, 
                   {OrderID:3, Total:702}, 
                   {OrderID:5, Total:250}]
           },{CustomerID:6, Region:"NY", Orders:[
                   {OrderID:7,Total:301}, 
                   {OrderID:8, Total:702}, 
                   {OrderID:9, Total:253}]
           },{CustomerID:10, Region:"WI", Orders:[
                   {OrderID:11,Total:304}, 
                   {OrderID:12, Total:705}, 
                   {OrderID:13, Total:256}]
           } ];    
       var res = linq.from('c', customers).
               from('o', 'c.Orders').
               select('c', 'o', function(c,o){
                   return {CustomerID:c.CustomerID, Region:c.Region, order:o};
               }).
               orderBy(function(c){                   
                  return c.order.Total;
               }).
               thenBy(function(c){
                   return c.Region;
               }).
               toArray();
               equal(res[1].order.Total, 702);
               equal(res[2].order.Total, 702);
               equal(res[1].Region, "Wa");
               equal(res[2].Region, "NY");
               equal(res[0].order.Total, 705);
   });   
   
       test("should reverse the result", function(){
        var linq = new JsLinq();
        var numbers = [5,4,1,3,9,8,6,7,2,0];
        var res = linq.from('n2', numbers).
                select('n2', self).
                reverse().
                toArray();             
        deepEqual(res, [0,2,7,6,8,9,3,1,4,5]);
    });    
```
