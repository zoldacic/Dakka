using System;
using HtmlAgilityPack;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Xml;
using System.Xml.Linq;

namespace WebCrawler
{
	class Program
	{
		static void Main(string[] args)
		{
			//Test();

			//var cards = new Dictionary<string, Dictionary<string, string>>();
			//ExtractInfo(cards, @"C:\Src\es6\Dakka\TestData\Nazdreg.html");

            //Crawl("http://www.conquestdb.com/en/card/search?faction=ork", cards);
            //var json = CreateCardJson(cards);
            //File.WriteAllText(@"C:\Src\es6\Dakka\TestData\Cards.json", json);

		    Directory.CreateDirectory("images");
		    GetCardNamesFromXml("ambush.o8d");
		}

	    private static void GetCardNamesFromXml(string path)
	    {
	        var document = XDocument.Load(path);
	        var sections = document.Descendants("section");
	        foreach (var section in sections)
	        {
	            foreach (var card in section.Descendants())
	            {
	                GoFetchImage(card.Attribute("id").Value, card.Value);
	            }
	        }
	    }

	    private static string GetImageUrl(string cardName)
	    {
            var cards = File.ReadAllText(@"Cards.json");
	        var cardNameAttr = string.Format("\"{0}\"", cardName);

	        var imageStartPos = cards.IndexOf("imageBase", cards.IndexOf(cardNameAttr)) + 13;
	        var imageEndPos = cards.IndexOf("\"", imageStartPos) - 1;
	        var imageUrl = cards.Substring(imageStartPos, imageEndPos - imageStartPos + 1);

	        return imageUrl;
	    }

        private static void GoFetchImage(string id, string cardName)
        {
            var imageUrl = GetImageUrl(cardName);
            var url = "http://www.conquestdb.com/image/card/" + imageUrl + ".jpg";

            var wc = new WebClient();
            wc.Headers[HttpRequestHeader.UserAgent] = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2";
            wc.DownloadFile(url, id + ".jpg");
        }



	    private static void Crawl(string url, Dictionary<string, Dictionary<string, string>> cards)
		{
			//var pageUri = new Uri(url);
			//var wc = new WebClient();
			//wc.Headers[HttpRequestHeader.UserAgent] = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2";
			//var html = wc.DownloadString(pageUri);

			var html = GetHtml(url);

			var doc = new HtmlDocument();
			doc.LoadHtml(html);	 //(@"C:\Src\es6\Dakka\TestData\ConquestDBOrks.html");
			var links = doc.DocumentNode.SelectNodes("//a[@href]").Where(l => l.Attributes.First().Value.Contains(@"/en/card/"));
			foreach (var link in links)
			{
				ExtractInfo(cards, link.Attributes.First(a => a.Name == "href").Value);
			}
		}

		private static string GetHtml(string url)
		{
			WebResponse response;
			StreamReader sr;

			var html = string.Empty;
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
			request.Method = "GET";
			response = request.GetResponse();
			sr = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
			do
			{
				Thread.Sleep(2000);
				html += sr.ReadToEnd();				
			} while (!sr.EndOfStream);

			sr.Close();
			response.Close();

			return html;
		}

		private static void ExtractInfo(Dictionary<string, Dictionary<string, string>> cards, string url)
		{
			var html = GetHtml(url);

			var page = new HtmlDocument();
			page.Load(html);
			var cardView = page.DocumentNode.SelectNodes("//div[@class='row card-view']");
			var panel = cardView.First().ChildNodes[1].ChildNodes[1];

			var panelBody = panel.ChildNodes[3];

			var cardAttributes = new Dictionary<string, string>();

			string key = string.Empty;
			string value = string.Empty;
			foreach (var childNode in panelBody.ChildNodes)
			{
				if (childNode.Name == "span" && childNode.Attributes.Any(a => a.Name == "class" && a.Value == "key")) {
					key = childNode.InnerText.Replace(':',' ').Trim();
				} else if (childNode.Name == "span" && childNode.Attributes.Any(a => a.Name == "class" && a.Value == "value")) {
					if (childNode.ChildNodes.Count > 1)	{
						foreach (var innerLink in childNode.ChildNodes)	{
							if (innerLink.Name == "a") {
								value += " " + innerLink.InnerText.Trim();
							}
						}
					} else {
						value = childNode.InnerText;
					}

					value = Regex.Replace(value, @"\t|\n|\r", "");
                    cardAttributes.Add(key, value.Trim());

					key = string.Empty;
					value = string.Empty;
				}
			}

			var cardName = panel.ChildNodes[1].ChildNodes[1].InnerText;
			cardAttributes.Add("Name", cardName.Trim());

			var imageSrc = cardView.First().ChildNodes[3].ChildNodes[1].Attributes.First(a => a.Name == "src").Value;
			cardAttributes.Add("Src", imageSrc.Trim());

			cards.Add(value = Regex.Replace(cardName, @"\t|\n|\r| ", ""), cardAttributes);
		}

        //private static string CreateCardJson(Dictionary<string, Dictionary<string, string>> cards) {
        //    return JsonConvert.SerializeObject(cards, Formatting.Indented);
        //}
	}
}
