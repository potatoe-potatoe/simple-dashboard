import json
from scrapy import Spider
from scrapy.selector import Selector
from scrapy.exceptions import IgnoreRequest

from covid19data.items import EndcovDataItem

class EndcovDataSpider(Spider):
    name = "endcovdata"
    allowed_domains = [ 'endcov.ph' ]
    start_urls = [
        'https://endcov.ph/dashboard'
    ]

    def parse(self, response):
        json_data = Selector(response).xpath('//*[@id="daily-cases"]/text()') \
            .extract()[0]
        if not json_data: # Check if no data from request.
            raise IgnoreRequest('No data found!')
        daily_data = json.loads(json_data)
        label_dates = daily_data['labels'] # Keys guaranteed to exist.
        all_data = daily_data['data']
        confirmed, recovered, deceased = all_data['confirmed'], \
            all_data['recovered'], all_data['dead']
        data_length = len(label_dates)
        for i in range(data_length):
            item = EndcovDataItem()
            item['date'] = label_dates[i]
            item['confirmed'], item['recovered'], item['deceased'] = \
                confirmed[i], recovered[i], deceased[i]
            yield item
