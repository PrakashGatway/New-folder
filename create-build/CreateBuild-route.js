var express = require('express');
const { spawn } = require('child_process');
var router = express.Router();

router.get('/cmd', async (req, res) => {
    const isValid = req.query.status === "true";
    // Execute the 'cli' command
    if (isValid) {
        let siteDeploy =await spawnCommand('yarn', ['run', 'prod-deploy']);
        return res.send({status: siteDeploy, message: "Site Deployed successfully!"});
    } else {
        return res.status(400).send({ status: false, message: "not found" });
    }
});

router.get('/genSitemap', async (req, res) => {
    const isValid = req.query.status === "true";
    // Execute the 'cli' command
    if (isValid) {
        let sitemapResponse = await spawnCommand('yarn', ['run', 'sitemap']);
        return res.send({status: sitemapResponse, message: "Sitemap created successfully!"});
    } else {
        return res.status(400).send({ status: false, message: "not found" });
    }
});

function spawnCommand(_command, args) {
    const command = spawn(_command, args)
    command.stdout.pipe(process.stdout)
    command.stderr.pipe(process.stderr)
    process.stdin.pipe(command.stdin)
    return new Promise((resolve, reject) => {
        command.on('close', () => {
            command.unref()
            resolve(true)
        })
        const handleError = (err) => {
            console.log('>es | [index.js] | LINE #45 | err : ', err)
            reject(err)
            command.unref()
            process.exit(1)
        };
        command.on('error', handleError)
    })
}
module.exports = router;