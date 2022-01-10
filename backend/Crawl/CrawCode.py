#!/usr/bin/env python
import json
import pprint
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.support import expected_conditions as EC
import time
import urllib.request
from selenium.webdriver.support.ui import WebDriverWait
driver = webdriver.Chrome('/Users/ihyeongwang/Desktop/crawling/chromedriver11')

dic = {

}


def seven11(cnt):
    mart_name = "seven11"

    driver.get("https://www.7-eleven.co.kr/product/presentList.asp")
    time.sleep(3)

    for i in range(1,3):

        driver.execute_script("window.scrollTo(0, 0)")
        driver.find_element_by_xpath("/html/body/div[2]/div[2]/form/div[3]/div[1]/ul/li[{}]/a".format(str(i))).click()
        time.sleep(1)

        while(1):
            try: 
                driver.find_element_by_class_name('btn_more').click()
                time.sleep(1)
            except:
                break

       
        products = len(driver.find_elements_by_class_name("tag_list_01"))
        
        for j in range(2,products+2):

            cnt += 1

            if(j<15):
                product_img = driver.find_element_by_xpath("/html/body/div[2]/div[2]/form/div[3]/div[2]/div/ul/li[{}]/div/img".format(str(j)))
                product_img = product_img.get_attribute("src")
                product_name = driver.find_element_by_xpath("/html/body/div[2]/div[2]/form/div[3]/div[2]/div/ul/li[{}]/div/div/div[1]".format(str(j))).text
                product_price = driver.find_element_by_xpath("/html/body/div[2]/div[2]/form/div[3]/div[2]/div/ul/li[{}]/div/div/div[2]/span".format(str(j))).text
                product_price = int(product_price.replace(",",""))
            else:
                product_img = driver.find_element_by_xpath("/html/body/div[2]/div[2]/form/div[3]/div[2]/div/ul/li[{}]/div/div/img".format(str(j)))
                product_img = product_img.get_attribute("src")
                product_name = driver.find_element_by_xpath("/html/body/div[2]/div[2]/form/div[3]/div[2]/div/ul/li[{}]/div/div/div/div[1]".format(str(j))).text
                product_price = driver.find_element_by_xpath("/html/body/div[2]/div[2]/form/div[3]/div[2]/div/ul/li[{}]/div/div/div/div[2]/span".format(str(j))).text
                product_price = int(product_price.replace(",",""))

            if(i == 1):
                event = "1+1"
                sale_price = product_price//2
            elif(i==2):
                event = "2+1"
                sale_price = product_price*2//3

            dic[cnt] = {
                "product_img" : product_img,
                "product_name": product_name,
                "product_prict":product_price,
                "sale_price"  : sale_price,
                "event" : event,
                "mart_name" : mart_name
            }
            print(dic[cnt])
            with open("data.json", 'w',encoding='UTF-8') as outfile:
                json.dump(dic, outfile, ensure_ascii=False,indent='\t')
            time.sleep(1)
    return cnt

def gs25(cnt):
    mart_name = "gs25"
    driver.get('http://gs25.gsretail.com/gscvs/ko/products/event-goods')

    for i in range(1,3):
        num = 1
        driver.find_element_by_xpath('/html/body/div[1]/div[4]/div[2]/div[3]/div/div/ul/li[{}]/span/a'.format(str(i))).click()
        time.sleep(2)
        while 1:
            try:
                
                product_name= (driver.find_element_by_css_selector('#contents > div.cnt > div.cnt_section.mt50 > div > div > div:nth-child(3) > ul > li:nth-child(%s) > div > p.tit' % num).text)
                if(i == 1):
                    product_price= driver.find_element_by_css_selector('#contents > div.cnt > div.cnt_section.mt50 > div > div > div:nth-child(3) > ul > li:nth-child(%s) > div > p.price' % num).text
                    product_price = product_price.replace(",","")
                    product_price = int(product_price.replace("원",""))
                else:
                    product_price= driver.find_element_by_css_selector('#contents > div.cnt > div.cnt_section.mt50 > div > div > div:nth-child(5) > ul > li:nth-child(%s) > div > p.price' % num).text
                    product_price = product_price.replace(",","")
                    product_price = int(product_price.replace("원",""))


                try:
                    product_img=(driver.find_element_by_css_selector('#contents > div.cnt > div.cnt_section.mt50 > div > div > div:nth-child(3) > ul > li:nth-child(%s) > div > p.img' % num).find_element_by_tag_name('img').get_attribute('src'))
                except NoSuchElementException:
                    pass
                num += 1
                if num is 8:
                    num = 1
                    driver.execute_script('goodsPageController.moveControl(1);')
                cnt += 1
                
                if(i == 1):
                    event = "1+1"
                    sale_price = product_price//2
                elif(i==2):
                    event = "2+1"
                    sale_price = product_price*2//3

                dic[cnt] = {
                    "product_img" : product_img,
                    "product_name": product_name,
                    "product_prict":product_price,
                    "sale_price"  : sale_price,
                    "event" : event,
                    "mart_name" : mart_name
                }
                print(dic)
                with open("data.json", 'w',encoding='UTF-8') as outfile:
                    json.dump(dic, outfile, ensure_ascii=False,indent='\t')
            except NoSuchElementException:
                break
            except StaleElementReferenceException:
                time.sleep(2)
    return cnt

def emart24(cnt):
    driver.get('https://www.emart24.co.kr/product/eventProduct.asp')

    num = 1
    while 1:
        try:
            cnt+=1
            # 상품의 이름 및 가격 (line1: name, line2: price, line3: img)
            print(driver.find_element_by_css_selector('#regForm > div.section > div.eventProduct > div.tabContArea > ul > li:nth-child(%s) > div > p.productDiv' % num).text)
            print(driver.find_element_by_css_selector('#regForm > div.section > div.eventProduct > div.tabContArea > ul > li:nth-child(%s) > div > p.price' % num).text)
            try:
                print(driver.find_element_by_css_selector('#regForm > div.section > div.eventProduct > div.tabContArea > ul > li:nth-child(%s) > div > p.productImg' % num).find_element_by_tag_name('img').get_attribute('src'))
            except NoSuchElementException:
                pass
            eventtype = driver.find_element_by_xpath('//*[@id="regForm"]/div[2]/div[3]/div[2]/ul/li[8]/div/div/p/img').get_attribute('alt')
            print(eventtype)
            if '2 + 1 뱃지'in eventtype:
                eventtype = '2+1'
            elif 'SALE 뱃지'in eventtype:
                eventtype = 'sale'
            elif 'X2 더블 뱃지'in eventtype:
                eventtype = 'dum'
            elif '1 + 1 뱃지 이미지'in eventtype:
                eventtype = '1+1'
            elif '3 + 1 뱃지'in eventtype:
                eventtype = '3+1'
            else:
                eventtype = 'error!'
            print(eventtype)
            num += 1
            if num is 16:
                num = 1
                driver.find_element_by_css_selector('#regForm > div.section > div.eventProduct > div.paging > a.next.bgNone > alt').click()
        except NoSuchElementException:
            break
        except StaleElementReferenceException:
            time.sleep(2)

    return cnt

        

        
cnt = 0
cnt = emart24(cnt)
cnt = gs25(cnt)
cnt = seven11(cnt)
