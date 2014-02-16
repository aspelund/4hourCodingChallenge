var JsLinq = (function() {

    var getIteratorNames = function(funcArguments){
        var res = Array.prototype.slice.call(funcArguments, 0);        
        return res.splice(0,res.length-1);
    };
    var getIterator = function(linq, funcArguments){
        var iteratorNames = getIteratorNames(funcArguments);
        var firstIterator = linq[iteratorNames[0]];
        var iterator = [];           
        var minLength = iteratorNames.reduce(function(lastVal, iteratorName){
            if(linq[iteratorName].length<lastVal)
                return linq[iteratorName].length;
            else
                return lastVal;
            
        }, linq[iteratorNames[0]].length);        
        for(var i=0;i<minLength;i++){
            var item = [];
            for(var j=0;j<iteratorNames.length;j++){
                item.push(linq[iteratorNames[j]][i]);
            }
            iterator.push(item);
        }
        return iterator;
    };
    
    var getInnerFunction = function(funcArguments){
        var args = Array.prototype.slice.call(funcArguments, 0);
        return args[args.length-1];
    };
    
    
    var getReshapedIteratorFromInner = function(linq, iteratorName, iteratorVariable){
        var inner = [], outer = [];
        linq[iteratorName].forEach(function(outerItem){
            outerItem[iteratorVariable].forEach(function(innerItem){
                outer.push(outerItem);
                inner.push(innerItem);
            });
        });
        return {innerIterator:inner, outerIterator:outer};
    };
    
    function Linq(){
    };
    
    Linq.prototype.from = function(){        
        var args = Array.prototype.slice.call(arguments, 0),
            parameterName = args[0],
            paramIndexName, 
            iterator;              
    
        if(Array.isArray(args[1]) || (typeof(args[1])==="string" && args[1].indexOf(".")>=0))
            iterator = args[1];
        else{
            paramIndexName = args[1];
            iterator = args[2];            
        }
        
        if(Array.isArray(iterator)){
            this[parameterName] = iterator;
        }
        if(typeof(iterator)==="string" && iterator.indexOf(".")>=0){                    
            var iteratorName = iterator.split('.')[0],
            iteratorVariable = iterator.split('.')[1];

            var res = getReshapedIteratorFromInner(this, iteratorName, iteratorVariable);
            this[iteratorName] = res.outerIterator;
            this[parameterName] = res.innerIterator;                    
        }
        if(paramIndexName !== undefined){
            var it = [];
            this[parameterName].forEach(function(e,i){
               it.push(i); 
            });
            this[paramIndexName] = it;
        }
        return this;
    };
    Linq.prototype.toArray = function(){
        return this.selectResult;
    };
    Linq.prototype.take = function(n){
        this.selectResult = this.selectResult.splice(0,n);
        return this;
    };
    Linq.prototype.skip = function(n){
        this.selectResult = this.selectResult.splice(n);
        return this;
    };    
    
    Linq.prototype.takeWhile = function(innerFunction){
        var res = [];
        this.selectResult.reduce(function(takeMore, item){
            if(!takeMore){
                return takeMore;
            }
            if(!innerFunction(item)){
                return false;
            }
            res.push(item);
            return takeMore;
        }, true);   
        this.selectResult = res;
        return this;
    };    
    Linq.prototype.orderBy = function(sortPropertyFunction){
        this.orderBySortPropertyFunction = sortPropertyFunction;
        this.selectResult = this.selectResult.sort(function(a,b){                        
            var a = sortPropertyFunction(a),
                b = sortPropertyFunction(b);
            return a<=b;
        });        
        return this;
    };
    
    Linq.prototype.thenBy = function(sortPropertyFunction){
        var first = this.orderBySortPropertyFunction;
        var second = sortPropertyFunction;
        this.selectResult = this.selectResult.sort(function(a,b){
            var a1 = first(a),
                b1 = first(b);
            if(a1<b1 || a1>b1)
                return a1<b1;
            a2 = second(a);
            b2 = second(b);
            return a2<=b2;
        });
        return this;
    };
    Linq.prototype.reverse = function(){
        var r = [];
        for(var i=this.selectResult.length-1;i>=0;i--){
            r.push(this.selectResult[i]);
        }
        this.selectResult = r;
        return this;
    };
    Linq.prototype.skipWhile = function(innerFunction){
        var res = [];
        this.selectResult.reduce(function(skipMore, item){
            if(!skipMore){
                res.push(item);
                return skipMore;
            }            
            if(innerFunction(item)){
                return true;
            }
            res.push(item);
            return false;
        }, true);   
        this.selectResult = res;
        return this;
    };    
    
    Linq.prototype.select = function(){
        var iterator = getIterator(this, arguments);         
        var innerFunction = getInnerFunction(arguments);
        var res = iterator.map(function(item){                
            return innerFunction.apply(null, item);                
        });
        this.selectResult = res;
        return this;
    };


    Linq.prototype.where = function(){        
        var iteratorNames = getIteratorNames(arguments);     
        var self = this;
        var iterator = getIterator(this, arguments); 
        
        var innerFunction = getInnerFunction(arguments);
        var filterArr = iterator.map(function(item){               
            return innerFunction.apply(null, item);                
        });                
        var self = this;
        iteratorNames.forEach(function(iteratorName){
           var replaceArr = [];
           var sourceArr = self[iteratorName];
           filterArr.forEach(function(res, index){
              if(res)
                  replaceArr.push(sourceArr[index]);
           });
           self[iteratorName] = replaceArr;
        });
        
        return this;
    };


    return Linq;

})();
