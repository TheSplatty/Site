/*
 * 
 * parsers.js
 * =========
 * Парсеры
 *  - createQuoteAuthor(). Обработка и вставка авторов цитат и их лиц.
 *  - setBoxEmbedWidth(). Установка заданного значения ширины у .box.embed'ов.
 *  - convertLinksToAjax(). Конвертирует ссылки для навигации по сайту (на Ajax'е).
 *  - setMenuItemActive(). Устанавливает активный пункт меню, в зависимости от адреса.
 *  - setTitle(). Устанавливает title страницы.
 *  - init(). Активирует все парсеры.
 *
*/

var parser = 
{
  createQuoteAuthor: function()
  {
    $('cite, blockquote, q').each(function()
    {
      var author    = $(this).attr('data-author'),
          authorImg = $(this).attr('data-author-img');

      var result;

      if (authorImg) 
      {
        result = '<em class="author italic"><span>' + author + '</span><img src="../client/img/author/' + authorImg + '.png">' + '</em>';
      } 
      else {
        result = '<em class="author italic">' + author + '</em>';
      };

      $(this).after(result);
      
      log('<' + this.nodeName.toLowerCase() + '>: ' + author);
    });
  },

  setBoxEmbedWidth: function()
  {
    $('.box.embed').each(function()
    {
      $(this).width($(this).attr('data-width'));
    });
  },
  
  convertLinksToAjax: function()
  {
    $('a').each(function(i)
    {
      var link     = $(this).attr('href'),
          template = 1;

      if (link && !link.match(regExp['link'])) 
      {
        $(this).removeAttr('href').attr('onclick', 'nav(\'' + link.substr(template) + '\');');

        log('Cконвертировал аттрибут href у <' + this.nodeName.toLowerCase() + '> из \'' + link + '\' в \'' + link.substr(template) + '\'');        
      };
    });
  },

  setMenuItemActive: function()
  {
    $('.menu .item').each(function()
    {
      var link = $(this).attr('onclick');

      var charBefore = 5,
          charAfter  = 3;

      link = link.substr(charBefore);
      link = link.substr(0, link.length - charAfter);

      if (link == getCurrentPage())
      {
        $(this).addClass('active');

        log('Пункт меню \'' + link + '\' активирован');
      }
      else {
        $(this).removeClass('active');      
      };
    });
  },

  setTitle: function() 
  {
    $('title').text($('h2').html() + ' | ' + config['siteName']);

    log('Заменил title страницы на ' + $('h2').html());
  },

  init: function()
  {
    this.createQuoteAuthor();
    this.setBoxEmbedWidth();
    this.convertLinksToAjax();
    this.setMenuItemActive();
    this.setTitle();

    log('Парсеры инициализированы');
  }
};