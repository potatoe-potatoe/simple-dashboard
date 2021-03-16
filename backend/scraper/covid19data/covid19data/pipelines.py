# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import logging
import os
import pymongo
from firebase_admin import credentials, firestore, initialize_app
from scrapy.exceptions import CloseSpider

from covid19data import settings

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


class FirestorePipeline():
    def __init__(self):
        firestore_settings = settings.FIRESTORE_SETTINGS 
        creds_path = os.path.join(os.getcwd(), firestore_settings['creds_file'])
        try:
            creds = credentials.Certificate(creds_path)
        except FileNotFoundError:
            raise CloseSpider('Firebase app credentials not found!')
        app = initialize_app(creds)
        db = firestore.client()
        self.collection = db.collection(firestore_settings['collection'])

    def process_item(self, item, spider):
        result_list = self.collection.where('date', '==', item['date']).stream()
        if not len(list(result_list)): # Check if document !exists.
            result = self.collection.add({
                **item,
                'created': firestore.SERVER_TIMESTAMP
            })
            logging.info(f'Inserted to DB! Ref: {result[1]}')
        else:
            logging.info(f'Item already in DB. Will skip insert. Item: {item}')
