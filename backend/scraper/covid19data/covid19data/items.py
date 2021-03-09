# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from scrapy.item import Item, Field


class EndcovDataItem(Item):
    date = Field()
    confirmed = Field()
    recovered = Field()
    deceased = Field()
