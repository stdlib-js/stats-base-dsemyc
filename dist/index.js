"use strict";var s=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var t=s(function(w,n){
var f=require('@stdlib/stats-base-dvarianceyc/dist').ndarray,p=require('@stdlib/math-base-special-sqrt/dist');function x(e,r,i,a,m){return p(f(e,r,i,a,m)/e)}n.exports=x
});var q=s(function(z,v){
var j=require('@stdlib/strided-base-stride2offset/dist'),l=t();function R(e,r,i,a){return l(e,r,i,a,j(e,a))}v.exports=R
});var y=s(function(A,d){
var _=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),c=q(),E=t();_(c,"ndarray",E);d.exports=c
});var O=require("path").join,b=require('@stdlib/utils-try-require/dist'),g=require('@stdlib/assert-is-error/dist'),h=y(),u,o=b(O(__dirname,"./native.js"));g(o)?u=h:u=o;module.exports=u;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
