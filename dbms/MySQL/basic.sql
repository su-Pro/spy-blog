# select name from heros;

# select constName as platform ,1 + 2 as 'testNumber',name from heros;

# select 'constName' as platform ,1 + 2 as 'testNumber',name from heros;

# select distinct  attack_range  from heros

# select name,hp_max from heros order by attack_max;

# select name,hp_max,max(attack_max) as '攻击值' from heros group by name ;

# 注意，where 语句的执行顺序是从下至上
select name, role_main, role_assist, hp_max, mp_max
from heros
where (role_main in ('坦克', '战士') and role_assist is not null)
    and (hp_max > 8000 or mp_max < 1500)