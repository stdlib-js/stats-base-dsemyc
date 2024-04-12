"use strict";var s=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var n=s(function(w,u){
var p=require('@stdlib/stats-base-dvarianceyc/dist'),x=require('@stdlib/math-base-special-sqrt/dist');function f(e,r,a,i){return x(p(e,r,a,i)/e)}u.exports=f
});var c=s(function(z,v){
var j=require('@stdlib/stats-base-dvarianceyc/dist').ndarray,l=require('@stdlib/math-base-special-sqrt/dist');function R(e,r,a,i,m){return l(j(e,r,a,i,m)/e)}v.exports=R
});var y=s(function(A,d){
var _=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),q=n(),E=c();_(q,"ndarray",E);d.exports=q
});var O=require("path").join,b=require('@stdlib/utils-try-require/dist'),g=require('@stdlib/assert-is-error/dist'),h=y(),t,o=b(O(__dirname,"./native.js"));g(o)?t=h:t=o;module.exports=t;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
