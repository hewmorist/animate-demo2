'use strict';
let calcShared=null,calcActive=null,calcSequence=0,calcQueue=[];
window.calcMetrics={completed:0,live:0,cache:0,last:null};
function pumpCalc(){
 if(calcActive||!calcQueue.length)return;
 calcQueue.sort((a,b)=>a.priority-b.priority||a.id-b.id);
 calcActive=calcQueue.shift();calcShared.postMessage({id:calcActive.id,p:calcActive.p});
}
class CalcWorker {
 constructor(priority){
  this.priority=priority;this.onmessage=null;this.onerror=null;this.stopped=false;
  if(!calcShared){
   calcShared=new Worker('calc-worker.js?v=hd1');
   calcShared.onmessage=e=>{
    const active=calcActive;calcActive=null;
    if(active&&!active.owner.stopped){
     if(e.data.error)active.owner.onerror?.(new Error(e.data.error));
     else{const p=e.data.p;calcMetrics.completed++;calcMetrics[active.priority===2?'cache':'live']++;
      calcMetrics.last={backend:p.backend,ms:p.renderMs,repaired:p.repaired??0,error:p.gpuError??null};
      active.owner.onmessage?.(e);}
    }
    setTimeout(pumpCalc,active?.priority===2?16:0);
   };
   calcShared.onerror=e=>{
    const owners=new Set(calcQueue.map(j=>j.owner));if(calcActive)owners.add(calcActive.owner);
    calcQueue=[];calcActive=null;calcShared.terminate();calcShared=null;
    for(const owner of owners)owner.onerror?.(e);
   };
  }
 }
 postMessage(p){if(this.stopped)return;calcQueue.push({id:++calcSequence,p:{...p,calc:'gpu'},priority:this.priority,owner:this});pumpCalc();}
 terminate(){this.stopped=true;calcQueue=calcQueue.filter(j=>j.owner!==this);}
}
