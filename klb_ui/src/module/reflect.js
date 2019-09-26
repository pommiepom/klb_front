const Reflect = promise => {
   return promise
       .then(v => {
               return {
                   v: v,
                   status: "fulfilled"
               }
           },
           e => {
               return {
                   e: e,
                   status: "rejected"
               }
           });
}

export default Reflect