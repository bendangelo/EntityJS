describe('core/array', function(){
  var query;

  beforeEach(function(){
    query = re();
  })

    it('should find by tag', function(){
      re._t['id'] = 10;

        eq(re('#id'), 10);
    });

    it('should find by group', function(){
      re._g['group']
    });

  it('should be right length', function(){

    eq(re([2]).length, 1)
  });

  it('should query by value', function(){

    var v = re.e().team = {num:1};
    //todo in the future?
    //a bit complicated
    //eq(re('team.num=1').length, 1)

  });

  it('should reject elements', function(){
    var k = re([1, 2, 3]);

    var that = this;

    is(k.reject(function(e, i, l){
      is(i)
      is(l)
      eq(that, this)
      return e == 1 || e == 3;
    }, this));

    eq(k[0], 2);

  });

  it('should return empty query', function(){
    eq(re().length, 0);
  })

  /*
  it('should select *', function(){

      ok(re('*'));
  });
  */

    it('should filter', function(){
      query = re([1,2,3,4]);

        eq(query.filter(function(v){
          return v == 1;
        }).length, 1)
    });

    it('should create query from array', function(){
      var a = [1,2,3];

      var q = re(a);

      eq(q[0], a[0])
      eq(q[1], a[1])
      eq(q[2], a[2])

    })

    it('invoke', function(){
      query = re([re.e('ok')]);

        eq(query.invoke('comp', 'b').first().comps(), ['ok', 'b'])
    });

    it('each', function(){
      var i = 0;
      is(re([re.e('dd')]).each(function(e, c, l){
        eq(i++, c);
        is(l)
      }));
    });

    it('sample', function(){
      is(re([1,2,3]).sample())
    });

    it('pluck', function(){

      var k = re([{f:0, y:0}]).pluck('f y');

      eq(k[0].f, 0);
      eq(k[0].y, 0);
    });

    it('should last', function(){
      var b = re.e();
      query.push(b);
      eq(query.last(), b)
    })

    it('should first', function(){
      var b = re.e();
      query.unshift(b);
      eq(query.first(), b)

    });

    it('should findall', function(){
      query = re([1,5,4,5]);

      var that = this;

      eq(query.findAll(function(v){
        eq(that, this);
        return v == 5;
      }, that).length, 2);
    });

    it('addAfter', function(){
      var b = re.e();

      query.push(10, 6);

      query.addAfter(10, b);

      eq(query.indexOf(b), 1);
    })

    it('addBefore', function(){

      var b = re.e();

      query.push(10, 6);

      query.addBefore(6, b);

      eq(query.indexOf(b), 1);
    })

    it('swap', function(){
      query.push(10, 6);


      query.swap(10, 6);

      eq(query[0], 6);
      eq(query[1], 10);
    })

    it('should remove', function(){

      var q = re();

      var e = re.e();

      q.push(10);
      q.push(e);

      //add in
      var n = re.e();

      q.remove(e);

      not(q.has(e))

    })

    it('should removeAt', function(){
      query = re([1,2,3,4]);

      ok(query.removeAt(0,2));

      eq(query.length, 1);
    });

    it('should clear', function(){
      query = re([1,2,3,4]);
      query.clear();

      eq(query.length, 0);
    });

    it('should count', function(){
      query = re([1,1,1,3,4]);
      var that = this;

      eq(query.count(function(v){
        eq(that, this);
        return v == 1;
      }, that), 3);
    })

    it('contains', function(){

      var en = re.e();

      var query = re();

      not(query.contains(en));

      query.push(en);

      ok(query.contains(en));

    })

    it('min', function(){
      var query = re();

      query.push(0)
      query.push(10)
      query.push(2)
      query.push(5)

      eq(query.min(function(e, i, l){
        eq(this, 'ok')
        is(i)
        is(l)

        return e;

        }, 'ok'), 0)
    })

    it('max', function(){

      var query = re();

      query.push(0)
      query.push(10)
      query.push(2)
      query.push(5)

      eq(query.max(function(e, i, l){
        eq(this, 'ok')
        is(i)
        is(l)

        return e;

        }, 'ok'), 10)
    })

    it('find', function(){
      var e = re();
      e.push(1);
      e.push(10);

      //find index with 10
      eq(e.find(function(t){
        eq(e, this)
        return t == 10;
        }), 10);

    })

    it('isEmpty', function(){
      ok(re().isEmpty())
    })

    it('every', function(){

      //check if all entities in query have value blah
      var e = re();
      e.push(re.e());
      e.push(re.e().set('blah', true));

      not(e.every(function(e){
        return e.blah;
        }));

      e.invoke('set', 'blah', true)

      //should now all have blah
      ok(e.every(function(e){
        return e.blah;
        }));

      //length zero..
      ok(re().every(function(){
        return false;
      }))
    })

})