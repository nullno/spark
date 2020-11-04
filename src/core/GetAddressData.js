/**
 * [getAddressData 通过地址获取组件所有信息]
 * @AuthorHTL
 * @DateTime  2020-04-01T05:25:07+0800
 * @param     {[type]}                 address [description]
 * @return    {[type]}                         [description]
 */
import Cache from './Cache.js'

export default function(address) {
        try {
          
            if (typeof address == 'string' && address.indexOf('Css') != -1) {
                throw 'ERROR: Error useing Widget'
            }

        } catch (err) {
            console.error(err);
            return {}
        }
        return address && Cache.WidgetCache[address];
 }
