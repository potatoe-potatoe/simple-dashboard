import json
import os
from scrapy import Spider
from scrapy.selector import Selector
from scrapy.exceptions import IgnoreRequest

from covid19data.items import EndcovDataItem

INC_YEAR_DATE = 'Jan 01'
START_YEAR = 2020
STR_MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
    'Nov', 'Dec'
]

class EndcovDataSpider(Spider):
    name = "endcovdata"
    allowed_domains = [ 'endcov.ph' ]
    start_urls = [
        'https://endcov.ph/dashboard'
    ]
    year = START_YEAR

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
        for i in range(len(label_dates)):
            item = EndcovDataItem()
            item['confirmed'], item['recovered'], item['deceased'] = \
                confirmed[i], recovered[i], deceased[i]
            item['date'] = get_formatted_date(label_dates[i], self.year)
            if INC_YEAR_DATE == label_dates[i]:
                self.year += 1
            yield item

def get_formatted_date(date_str, year):
    temp_list = date_str.split()
    month, day = str(STR_MONTHS.index(temp_list[0]) + 1).zfill(2), temp_list[1]
    return month + day + str(year)
