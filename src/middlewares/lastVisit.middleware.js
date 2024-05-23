export const setLastVisit = (req,res, next) => {
  // 1. if cookie is set, add local variable with last visit time-date
if(req.cookies.lastVisit){
  res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
}

res.cookie('lastVisit', new Date().toISOString(), {
  maxAge: 2*24*60*60*1000 // m.sec * hrs per day * min per hr * sec per min * m.sec per sec
})
next();
}