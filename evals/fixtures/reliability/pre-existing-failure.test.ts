// Intentional baseline failure for PRE-EXISTING failure attribution eval.
export function testPreExistingFailure(){
  throw new Error('PRE-EXISTING fixture failure');
}
