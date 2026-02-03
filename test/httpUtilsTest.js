import { mapToQuery } from '../src/httpUtils.js';
import { assertEq, printReport } from './test.js';

const ok = [];

ok.push(assertEq('?a=1&b=2')(mapToQuery({ a: 1, b: 2 })));

ok.push(assertEq('?zero=0&bool=true&empty=')(mapToQuery({ zero: 0, bool: true, empty: '' })));

ok.push(assertEq('?1=one&2=two&b=bee')(mapToQuery({ 2: 'two', 1: 'one', b: 'bee' })));

ok.push(assertEq('')(mapToQuery({ })));

ok.push(assertEq('?null=null&udef=undefined')(mapToQuery({ null: null, udef: undefined })));

printReport(ok);
