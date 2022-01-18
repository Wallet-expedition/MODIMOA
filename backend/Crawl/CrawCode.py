#!/usr/bin/env python
import json
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException,ElementClickInterceptedException
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium.webdriver.support.ui import WebDriverWait
import csv
import datetime as dt
import calendar


driver = webdriver.Chrome('/Users/ihyeongwang/Desktop/crawling/chromedriver11')

dic = {

}


def SEVEN11(cnt):
    mart_name = "SEVEN11"

    driver.get("https://www.7-eleven.co.kr/product/presentList.asp")
    time.sleep(3)

    for i in range(1,3):

        driver.execute_script("window.scrollTo(0, 0)")
        driver.find_element_by_xpath("/html/body/div[2]/div[2]/form/div[3]/div[1]/ul/li[{}]/a".format(str(i))).click()
        time.sleep(1)

        while(1):
            try: 
                driver.find_element_by_class_name('btn_more').click()
                time.sleep(2)
            except:
                break

       
        products = len(driver.find_elements_by_class_name("tag_list_01"))
        
        for j in range(2,products+2):

            cnt += 1

            if(j<15):
                product_img = driver.find_element_by_css_selector("#listUl > li:nth-child({}) > div > img".format(str(j)))
                product_img = product_img.get_attribute("src")
                product_name = driver.find_element_by_css_selector("#listUl > li:nth-child({}) > div > div > div.name".format(str(j))).text
                product_price = driver.find_element_by_css_selector("#listUl > li:nth-child({}) > div > div > div.price".format(str(j))).text
                product_price = int(product_price.replace(",",""))
            else:
                product_img = driver.find_element_by_css_selector("#listUl > li:nth-child({}) > div >div> img".format(str(j)))
                product_img = product_img.get_attribute("src")
                product_name = driver.find_element_by_css_selector("#listUl > li:nth-child({}) > div >div> div > div.name".format(str(j))).text
                product_price = driver.find_element_by_css_selector("#listUl > li:nth-child({}) > div > div>div > div.price".format(str(j))).text
                product_price = int(product_price.replace(",",""))

            if(i == 1):
                event = "OnePlusOne"
                sale_price = product_price//2
            elif(i==2):
                event = "TwoPlusOne"
                sale_price = product_price*2//3

            dic[cnt] = {
                "product_image" : product_img,
                "product_name": product_name,
                "original_price":product_price,
                "sale_price"  : sale_price,
                "sale_category" : event,
                "mart_name" : mart_name
            }
            with open("data.json", 'w',encoding='UTF-8') as outfile:
                json.dump(dic, outfile, ensure_ascii=False,indent='\t')
    print("End Seven")
    return cnt

def GS25(cnt):
    mart_name = "GS25"
    driver.get('http://gs25.gsretail.com/gscvs/ko/products/event-goods')

    for i in range(1,3):
        num = 1
        driver.find_element_by_xpath('/html/body/div[1]/div[4]/div[2]/div[3]/div/div/ul/li[{}]/span/a'.format(str(i))).click()
        time.sleep(2)
        while 1:
            try:
                if(i == 1):
                    product_name= (driver.find_element_by_css_selector('#contents > div.cnt > div.cnt_section.mt50 > div > div > div:nth-child(3) > ul > li:nth-child(%s) > div > p.tit' % num).text)
                    product_price= driver.find_element_by_css_selector('#contents > div.cnt > div.cnt_section.mt50 > div > div > div:nth-child(3) > ul > li:nth-child(%s) > div > p.price' % num).text
                    product_price = product_price.replace(",","")
                    product_price = int(product_price.replace("원",""))
                else:
                    product_name= (driver.find_element_by_css_selector('#contents > div.cnt > div.cnt_section.mt50 > div > div > div:nth-child(5) > ul > li:nth-child(%s) > div > p.tit' % num).text)
                    product_price= driver.find_element_by_css_selector('#contents > div.cnt > div.cnt_section.mt50 > div > div > div:nth-child(5) > ul > li:nth-child(%s) > div > p.price' % num).text
                    product_price = product_price.replace(",","")
                    product_price = int(product_price.replace("원",""))


                try:
                    product_img=(driver.find_element_by_css_selector('#contents > div.cnt > div.cnt_section.mt50 > div > div > div:nth-child(3) > ul > li:nth-child(%s) > div > p.img' % num).find_element_by_tag_name('img').get_attribute('src'))
                except NoSuchElementException:
                    pass
                num += 1
                if num == 8:
                    num = 1
                    driver.execute_script('goodsPageController.moveControl(1);')
                cnt += 1
                
                if(i == 1):
                    event = "OnePlusOne"
                    sale_price = product_price//2
                elif(i==2):
                    event = "TwoPlusOne"
                    sale_price = product_price*2//3

                dic[cnt] = {
                    "product_image" : product_img,
                    "product_name": product_name,
                    "original_price":product_price,
                    "sale_price"  : sale_price,
                    "sale_category" : event,
                    "mart_name" : mart_name
                }
                print(dic)
                with open("data.json", 'w',encoding='UTF-8') as outfile:
                    json.dump(dic, outfile, ensure_ascii=False,indent='\t')
            except NoSuchElementException:
                break
            except StaleElementReferenceException:
                time.sleep(2)
    print("End Gs")
    return cnt

def EMART24(cnt):
    driver.get('https://www.emart24.co.kr/product/eventProduct.asp')
    mart_name = "EMART24"
    pagenum = driver.find_element_by_css_selector("#regForm > div.section > div.eventProduct > div.paging > a:nth-child(14)").get_attribute('href')
    pagenum = re.findall(r'\d+', pagenum)
    pagenum = int(pagenum[0])
    num = 1
    page = 1
    while 1:
        try:
            
            # 상품의 이름 및 가격 (line1: name, line2: price, line3: img)
                                                                
            product_name = (driver.find_element_by_css_selector('#regForm > div.section > div.eventProduct > div.tabContArea > ul > li:nth-child(%s) > div > p.productDiv' % num).text)
            product_price = driver.find_element_by_css_selector('#regForm > div.section > div.eventProduct > div.tabContArea > ul > li:nth-child(%s) > div > p.price' % num).text
            product_price = product_price.replace(",","")
            product_price = product_price.replace("원","")

            try:
                product_img = (driver.find_element_by_css_selector('#regForm > div.section > div.eventProduct > div.tabContArea > ul > li:nth-child(%s) > div > p.productImg' % num).find_element_by_tag_name('img').get_attribute('src'))
            except NoSuchElementException:
                pass
                                                     
            eventtype = driver.find_element_by_xpath('//*[@id="regForm"]/div[2]/div[3]/div[2]/ul/li[%s]/div/div/p/img'%num).get_attribute('alt')
            if '2 + 1 뱃지'in eventtype:
                eventtype = 'TwoPlusOne'
                product_price = int(product_price)
                sale_price = int(product_price)*2//3
            elif 'SALE 뱃지'in eventtype:
                product_price = product_price.replace(" →"," ")
                product_price = product_price.split()
                sale_price = int(product_price[1])
                product_price = int(product_price[0])
                eventtype = 'Discount'
            elif '1 + 1 뱃지 이미지'in eventtype:
                eventtype = 'OnePlusOne'
                product_price = int(product_price)
                sale_price = int(product_price)//2
            elif '3 + 1 뱃지'in eventtype:
                eventtype = 'ThreePlusOne'
                product_price = int(product_price)
                sale_price = int(product_price)*3//4
            else:
                eventtype = 'error!'

            num += 1
            if(eventtype != 'error!'):
                cnt+=1
                dic[cnt] = {
                        "product_image" : product_img,
                        "product_name": product_name,
                        "original_price":product_price,
                        "sale_price"  : sale_price,
                        "sale_category" : eventtype,
                        "mart_name" : mart_name
                    }
                with open("data.json", 'w',encoding='UTF-8') as outfile:
                        json.dump(dic, outfile, ensure_ascii=False,indent='\t')

            if num == 16:
                num = 1             
                driver.find_element_by_css_selector('#regForm > div.section > div.eventProduct > div.paging > a.next.bgNone ').click()
                page+=1
            if(pagenum == page):
                break
        except NoSuchElementException:
            break
        except StaleElementReferenceException:
            time.sleep(2)
    print("End Emart")
    return cnt

def CU(cnt):
    mart_name = "CU"
    num = 0

    driver.get("https://cu.bgfretail.com/event/plus.do")
    time.sleep(3)
    while(1):
        try:
            driver.find_element_by_css_selector("#contents > div.relCon > div.prodListWrap > div > div.prodListBtn-w > a").click()
        except ElementClickInterceptedException:
            time.sleep(2)
            continue
        except  StaleElementReferenceException:
            time.sleep(2)
            continue
        except NoSuchElementException:
            break
    col = 17
    while(1):
        try:
            num+= 1
            cnt +=1
           
                                                                 #contents > div.relCon > div.prodListWrap > ul:nth-child(272) > li:nth-child(39) > p.prodName
                                                                 #contents > div.relCon > div.prodListWrap > ul:nth-child(289) > li:nth-child(1) > p.prodName 
            product_name = (driver.find_element_by_css_selector('#contents > div.relCon > div.prodListWrap > ul:nth-child(%s) > li:nth-child(%s) > p.prodName' %(col , num)).text)
            product_price = driver.find_element_by_css_selector('#contents > div.relCon > div.prodListWrap > ul:nth-child(%s) > li:nth-child(%s) > p.prodPrice' %(col , num)).text
            product_price = product_price.replace(",","")
            product_price = int(product_price.replace("원",""))
            product_img = driver.find_element_by_css_selector('#contents > div.relCon > div.prodListWrap > ul:nth-child(%s) > li:nth-child(%s) > div > a > img' %(col , num)).get_attribute("src")
            event = driver.find_element_by_css_selector('#contents > div.relCon > div.prodListWrap > ul:nth-child(%s) > li:nth-child(%s) > ul > li ' %(col , num)).text
            if (event == "1+1"):
                event = "OnePlusOne"
                sale_price = product_price//2
            elif (event == "2+1"):
                event = "TwoPlusOne"
                sale_price = product_price*2//3
            else:
                sale_price = 0
            print(product_name,product_img,product_price,event)
            dic[cnt] = {
                        "product_image" : product_img,
                        "product_name": product_name,
                        "original_price":product_price,
                        "sale_price"  : sale_price,
                        "sale_category" : event,
                        "mart_name" : mart_name
                    }
            with open("data.json", 'w',encoding='UTF-8') as outfile:
                    json.dump(dic, outfile, ensure_ascii=False,indent='\t')
            if(num == 40):
                col +=17
                num = 1
        except NoSuchElementException:
            break
        
    print("End CU")
    return cnt
        
cnt = 0
cnt = CU(cnt)
cnt = GS25(cnt)
cnt = EMART24(cnt)
cnt = SEVEN11(cnt)
driver.close()

with open('data.json', 'r', encoding = 'utf-8') as input_file, open('data.csv', 'w', newline = '') as output_file :
    data = json.load(input_file)
    
    	# "product_img": "https://www.7-eleven.co.kr/upload/product/8801069/415048.1.jpg",
		# "product_name": "PB)마쉼흑당라떼320ml",
		# "product_price": 2300,
		# "sale_price": 1533,
		# "event": "2+1",
		# "mart_name": "seven11" 

    f = csv.writer(output_file)
    # csv 파일에 header 추가
    f.writerow(["mart_name"	,"product_name"	,"product_image","original_price","sale_price",	"sale_start_day","sale_end_day"	,"sale_category","gift_name","gift_image",	"gift_price",	"created_day"])
    # write each row of a json file
    now = dt.datetime.now()
    lastday = calendar.monthrange(now.year, now.month)[1]
    created_day = str(now.year)+"-"+str(now.month)+"-"+str(now.day)
    sale_start_day = str(now.year)+"-"+str(now.month)+"-1"
    sale_end_day = str(now.year)+"-"+str(now.month)+"-"+str(lastday)



 	
    for k in range(1,len(data)+1):
        try:
            f.writerow([data[str(k)]["mart_name"], data[str(k)]["product_name"], data[str(k)]["product_image"], data[str(k)]["original_price"], data[str(k)]["sale_price"], sale_start_day, sale_end_day, data[str(k)]["sale_category"], " " , " ", " " ,created_day])
        except KeyError:
            continue
