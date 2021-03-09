# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import pymongo
import logging

from covid19data import settings
from scrapy.exceptions import DropItem

class MongoDBPipeline():
    def __init__(self):
        mongodb_settings = settings.MONGODB_SETTINGS
        connection = pymongo.MongoClient(
            mongodb_settings['server'],
            mongodb_settings['port']
        )
        db = connection[mongodb_settings['db']]
        self.collection = db[mongodb_settings['collection']]

    def process_item(self, item, spider):
        if self.collection.find_one(item) is None: # Check if document !exists.
            result = self.collection.insert_one(dict(item))
            if not result.acknowledged: # Check if insert is NG.
                logging.warn(f'Not inserted: {item}')
            else:
                logging.info(f'Inserted to DB! Item: {item}')
        else:
            logging.info(f'Item already in DB. Will skip insert. Item: {item}')
