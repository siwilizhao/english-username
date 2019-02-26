/**
 * @author [siwilizhao]
 * @email [siwilizhao@gmail.com]
 * @create date 2019-02-26 11:21:36
 * @modify date 2019-02-26 11:21:36
 * @desc [english username for nodejs]
 */
(async () => {
    const letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const host = 'http://ename.dict.cn'
    const pathname = 'list/celebrity'
    const cheerio = require('cheerio')
    const got = require('got')
    /*  */
    const target_urls = []
    for (const letter of letters) {
        const res = await got(`${host}/${pathname}/${letter}`)
        const $ = cheerio.load(res.body)
        const total_page = $('.pager > a').last().attr('href').replace(`/${pathname}/${letter}/`, '')
        // console.log(`letter: ${letter}: total_page: ${total_page}`)
        for (let page = 1; page <= Number(total_page); page++) {
            target_urls.push(`${host}/${pathname}/${letter}/${page}`)
        }
    }
    const fs = require('fs')
    const stream = fs.createWriteStream('./data.json')
    const data = []
    for (const target_url of target_urls) {
        const res = await got(target_url)
        const $ = cheerio.load(res.body)
        $('table.enname-all > tbody > tr').each((index, ele) => {
            if (index > 0) {
                data.push({
                    english: $(ele).find('td').first().children('a').text(),
                    sexy: $(ele).find('td').eq(1).children('em').attr('title'),
                    phonetic_symbol: $(ele).find('td').eq(2).children('i').text(),
                    chinese:  $(ele).find('td').eq(3).text(),
                    source:  $(ele).find('bdo').text(),
                })
            }
        })
    }
    stream.write(JSON.stringify(data))
})()
