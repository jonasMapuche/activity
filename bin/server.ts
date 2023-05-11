import app from '../src/br.com.stomach/app';
const port = normalizaPort(process.env.PORT || '8889');
function normalizaPort(val: any) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
if (port >= 0) {
        return port;
    }
return false;
}
app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})
