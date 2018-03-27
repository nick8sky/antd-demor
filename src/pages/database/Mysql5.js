import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Mysql5 extends Component {
    render() {


        return (
            <div>
                <Markdown source={" \n" +
                "\n" +
                "## 使用java Spring实现读写分离（ MySQL实现主从复制）\n" +
                "\n" +
                "我们一般应用对数据库而言都是“读多写少”，也就说对数据库读取数据的压力比较大，有一个思路就是说采用数据库集群的方案，\n" +
                "\n" +
                "其中一个是主库，负责写入数据，我们称之为：写库；\n" +
                "\n" +
                "其它都是从库，负责读取数据，我们称之为：读库；\n" +
                "\n" +
                " \n" +
                "\n" +
                "那么，对我们的要求是：\n" +
                "\n" +
                "1、读库和写库的数据一致；\n" +
                "\n" +
                "2、写数据必须写到写库；\n" +
                "\n" +
                "3、读数据必须到读库；\n" +
                "\n" +
                "\n" +
                "\n" +
                "**方案**\n" +
                "\n" +
                "解决读写分离的方案有两种：应用层解决和中间件解决。\n" +
                "\n" +
                "### 应用层解决：\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/2d5d2d4bd53f61613845034141168bcb?fid=940423185-250528-867552854012121&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-kfloc7zNkUg9IzriQsHFdwiXzPc%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434218783266067139&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "优点：\n" +
                "\n" +
                "1、多数据源切换方便，由程序自动完成；\n" +
                "\n" +
                "2、不需要引入中间件；\n" +
                "\n" +
                "3、理论上支持任何数据库；\n" +
                "\n" +
                "缺点：\n" +
                "\n" +
                "1、由程序员完成，运维参与不到；\n" +
                "\n" +
                "2、不能做到动态增加数据源；\n" +
                "\n" +
                "\n" +
                "\n" +
                "### 中间件解决:\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/b198c96f28a4006ca3c8ae85fd506a60?fid=940423185-250528-808290695766203&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-uTM5UZRqfnU%2FE7HeOEPJmyxnsmE%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434225731405943405&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "优点：\n" +
                "\n" +
                "1、源程序不需要做任何改动就可以实现读写分离；\n" +
                "\n" +
                "2、动态添加数据源不需要重启程序；\n" +
                "\n" +
                " \n" +
                "\n" +
                "缺点：\n" +
                "\n" +
                "1、程序依赖于中间件，会导致切换数据库变得困难；\n" +
                "\n" +
                "2、由中间件做了中转代理，性能有所下降；\n" +
                "\n" +
                "\n" +
                "\n" +
                "**使用Spring基于应用层实现**\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/d111487304bb89124f707397bd79ad07?fid=940423185-250528-501700163937103&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-2hHyHmsb1M0brI705wy97qaB3aw%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434232353568608413&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "在进入Service之前，使用AOP来做出判断，是使用写库还是读库，判断依据可以根据方法名判断，比如说以query、find、get等开头的就走读库，其他的走写库。\n" +
                "\n" +
                "1、使用多数据源管理DynamicDataSource\n" +
                "\n" +
                "```\n" +
                "public class MultipleDataSource  extends AbstractRoutingDataSource {\n" +
                "    @Override  \n" +
                "    protected Object determineCurrentLookupKey() {  \n" +
                "        // 使用DynamicDataSourceHolder保证线程安全，并且得到当前线程中的数据源key  \n" +
                "        return DynamicDataSourceHolder.getDataSourceKey();  \n" +
                "    }   \n" +
                "}\n" +
                "```\n" +
                "\n" +
                "DynamicDataSourceHolder\n" +
                "\n" +
                "```\n" +
                "public class DynamicDataSourceHolder {    \n" +
                "    //写库对应的数据源key  \n" +
                "    private static final String MASTER = \"master\";  \n" +
                "    //读库对应的数据源key  \n" +
                "    private static final String SLAVE = \"slave\";  \n" +
                "    //使用ThreadLocal记录当前线程的数据源key  \n" +
                "    private static final ThreadLocal<String> holder = new ThreadLocal<String>();  \n" +
                "    /** \n" +
                "     * 设置数据源key \n" +
                "     * @param key \n" +
                "     */  \n" +
                "    public static void putDataSourceKey(String key) {  \n" +
                "        holder.set(key);  \n" +
                "    }  \n" +
                "    /** \n" +
                "     * 获取数据源key \n" +
                "     * @return \n" +
                "     */  \n" +
                "    public static String getDataSourceKey() {  \n" +
                "        return holder.get();  \n" +
                "    }  \n" +
                "    /** \n" +
                "     * 标记写库 \n" +
                "     */  \n" +
                "    public static void markMaster(){  \n" +
                "        putDataSourceKey(MASTER);  \n" +
                "    }  \n" +
                "    /** \n" +
                "     * 标记读库 \n" +
                "     */  \n" +
                "    public static void markSlave(){  \n" +
                "        putDataSourceKey(SLAVE);  \n" +
                "    }  \n" +
                "} \n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "2、数据源切面DataSourceAspect[路由策略]\n" +
                "\n" +
                "```\n" +
                "public class DataSourceAspect {  \n" +
                "    /** \n" +
                "     * 在进入Service方法之前执行 \n" +
                "     * @param point 切面对象 \n" +
                "     */  \n" +
                "    public void before(JoinPoint point) {  \n" +
                "        // 获取到当前执行的方法名  \n" +
                "        String methodName = point.getSignature().getName();  \n" +
                "        if (isSlave(methodName)) {  \n" +
                "            // 标记为读库  \n" +
                "            MultipleDataSource.markSlave();  \n" +
                "        } else {  \n" +
                "            // 标记为写库  \n" +
                "            DynamicDataSourceHolder.markMaster();  \n" +
                "        }  \n" +
                "    }  \n" +
                "  \n" +
                "    /** \n" +
                "     * 判断是否为读库 \n" +
                "     * @param methodName \n" +
                "     */  \n" +
                "    private Boolean isSlave(String methodName) {  \n" +
                "        // 方法名以query、find、get开头的方法名走从库  \n" +
                "        return StringUtils.startsWithAny(methodName, \"query\", \"find\", \"get\");  \n" +
                "    }  \n" +
                "  \n" +
                "} \n" +
                "```\n" +
                "\n" +
                "3、jdbc.properties\n" +
                "\n" +
                "```\n" +
                "jdbc.master.driver=com.mysql.jdbc.Driver  \n" +
                "jdbc.master.url=jdbc:mysql://127.0.0.1:3306/mybatis_1128?useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true  \n" +
                "jdbc.master.username=root  \n" +
                "jdbc.master.password=123456  \n" +
                "  \n" +
                "  \n" +
                "jdbc.slave01.driver=com.mysql.jdbc.Driver  \n" +
                "jdbc.slave01.url=jdbc:mysql://127.0.0.1:3307/mybatis_1128?useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true  \n" +
                "jdbc.slave01.username=root  \n" +
                "jdbc.slave01.password=123456  \n" +
                "```\n" +
                "\n" +
                "4、定义DataSource\n" +
                "\n" +
                "```\n" +
                "<!-- 定义数据源，使用自己实现的数据源 -->  \n" +
                "    <bean id=\"dataSource\" class=\"cn.itcast.usermanage.spring.DynamicDataSource\">  \n" +
                "        <!-- 设置多个数据源 -->  \n" +
                "        <property name=\"targetDataSources\">  \n" +
                "            <map key-type=\"java.lang.String\">  \n" +
                "                <!-- 这个key需要和程序中的key一致 -->  \n" +
                "                <entry key=\"master\" value-ref=\"masterDataSource\"/>  \n" +
                "                <entry key=\"slave\" value-ref=\"slave01DataSource\"/>  \n" +
                "            </map>  \n" +
                "        </property>  \n" +
                "        <!-- 设置默认的数据源，这里默认走写库 -->  \n" +
                "        <property name=\"defaultTargetDataSource\" ref=\"masterDataSource\"/>  \n" +
                "    </bean>  \n" +
                "```\n" +
                "\n" +
                "5、定义事务管理器\n" +
                "\n" +
                "```\n" +
                "<!-- 定义事务管理器 -->  \n" +
                "    <bean id=\"transactionManager\"  \n" +
                "        class=\"org.springframework.jdbc.datasource.DataSourceTransactionManager\">  \n" +
                "        <property name=\"dataSource\" ref=\"dataSource\" />  \n" +
                "    </bean>  \n" +
                "```\n" +
                "\n" +
                "6、定义事务策略\n" +
                "\n" +
                "```\n" +
                "<!-- 定义事务策略 -->  \n" +
                "    <tx:advice id=\"txAdvice\" transaction-manager=\"transactionManager\">  \n" +
                "        <tx:attributes>  \n" +
                "            <!--定义查询方法都是只读的 -->  \n" +
                "            <tx:method name=\"query*\" read-only=\"true\" />  \n" +
                "            <tx:method name=\"find*\" read-only=\"true\" />  \n" +
                "            <tx:method name=\"get*\" read-only=\"true\" />  \n" +
                "  \n" +
                "            <!-- 主库执行操作，事务传播行为定义为默认行为 -->  \n" +
                "            <tx:method name=\"save*\" propagation=\"REQUIRED\" />  \n" +
                "            <tx:method name=\"update*\" propagation=\"REQUIRED\" />  \n" +
                "            <tx:method name=\"delete*\" propagation=\"REQUIRED\" />  \n" +
                "  \n" +
                "            <!--其他方法使用默认事务策略 -->  \n" +
                "            <tx:method name=\"*\" />  \n" +
                "        </tx:attributes>  \n" +
                "    </tx:advice> \n" +
                "```\n" +
                "\n" +
                "7、定义切面\n" +
                "\n" +
                "```\n" +
                "<!-- 定义AOP切面处理器 -->  \n" +
                "    <bean class=\"cn.itcast.usermanage.spring.DataSourceAspect\" id=\"dataSourceAspect\" />  \n" +
                "  \n" +
                "    <aop:config>  \n" +
                "        <!-- 定义切面，所有的service的所有方法 -->  \n" +
                "        <aop:pointcut id=\"txPointcut\" expression=\"execution(* xx.xxx.xxxxxxx.service.*.*(..))\" />  \n" +
                "        <!-- 事务策略切入Service切面 -->  \n" +
                "        <aop:advisor advice-ref=\"txAdvice\" pointcut-ref=\"txPointcut\"/>  \n" +
                "          \n" +
                "        <!-- 路由策略切入Service切面，-9999保证该切面优先级最高执行 -->  \n" +
                "        <aop:aspect ref=\"dataSourceAspect\" order=\"-9999\">  \n" +
                "            <aop:before method=\"before\" pointcut-ref=\"txPointcut\" />  \n" +
                "        </aop:aspect>  \n" +
                "    </aop:config>  \n" +
                "```\n" +
                "\n" +
                "之前的实现我们是将通过方法名匹配，而不是使用事务策略中的定义，我们使用事务管理策略中的规则匹配。\n" +
                "\n" +
                "8、改进后的配置\n" +
                "\n" +
                "```\n" +
                " <bean class=\"cn.itcast.usermanage.spring.DataSourceAspect\" id=\"dataSourceAspect\">  \n" +
                "        <!-- 指定事务策略 -->  \n" +
                "        <property name=\"txAdvice\" ref=\"txAdvice\"/>  \n" +
                "        <!-- 指定slave方法的前缀（非必须） -->  \n" +
                "        <property name=\"slaveMethodStart\" value=\"query,find,get\"/>  \n" +
                "    </bean>  \n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "9、改进后的实现\n" +
                "\n" +
                "```\n" +
                "/** \n" +
                " * 定义数据源的AOP切面，该类控制了使用Master还是Slave。 \n" +
                " * 如果事务管理中配置了事务策略，则采用配置的事务策略中的标记了ReadOnly的方法是用Slave，其它使用Master。 \n" +
                " * 如果没有配置事务管理的策略，则采用方法名匹配的原则，以query、find、get开头方法用Slave，其它用Master。 \n" +
                " */  \n" +
                "public class DataSourceAspect {  \n" +
                "    private List<String> slaveMethodPattern = new ArrayList<String>();  \n" +
                "    private static final String[] defaultSlaveMethodStart = new String[]{ \"query\", \"find\", \"get\" };  \n" +
                "    private String[] slaveMethodStart;  \n" +
                "  \n" +
                "    /** \n" +
                "     * 读取事务管理中的策略 \n" +
                "     */  \n" +
                "    @SuppressWarnings(\"unchecked\")  \n" +
                "    public void setTxAdvice(TransactionInterceptor txAdvice) throws Exception {  \n" +
                "        if (txAdvice == null) {  \n" +
                "            // 没有配置事务管理策略  \n" +
                "            return;  \n" +
                "        }  \n" +
                "        //从txAdvice获取到策略配置信息  \n" +
                "        TransactionAttributeSource transactionAttributeSource = txAdvice.getTransactionAttributeSource();  \n" +
                "        if (!(transactionAttributeSource instanceof NameMatchTransactionAttributeSource)) {  \n" +
                "            return;  \n" +
                "        }  \n" +
                "        //使用反射技术获取到NameMatchTransactionAttributeSource对象中的nameMap属性值  \n" +
                "        NameMatchTransactionAttributeSource matchTransactionAttributeSource = (NameMatchTransactionAttributeSource) transactionAttributeSource;  \n" +
                "        Field nameMapField = ReflectionUtils.findField(NameMatchTransactionAttributeSource.class, \"nameMap\");  \n" +
                "        nameMapField.setAccessible(true); //设置该字段可访问  \n" +
                "        //获取nameMap的值  \n" +
                "        Map<String, TransactionAttribute> map = (Map<String, TransactionAttribute>) nameMapField.get(matchTransactionAttributeSource);  \n" +
                "  \n" +
                "        //遍历nameMap  \n" +
                "        for (Map.Entry<String, TransactionAttribute> entry : map.entrySet()) {  \n" +
                "            if (!entry.getValue().isReadOnly()) {//判断之后定义了ReadOnly的策略才加入到slaveMethodPattern  \n" +
                "                continue;  \n" +
                "            }  \n" +
                "            slaveMethodPattern.add(entry.getKey());  \n" +
                "        }  \n" +
                "    }  \n" +
                "  \n" +
                "    /** \n" +
                "     * 在进入Service方法之前执行 \n" +
                "     * @param point 切面对象 \n" +
                "     */  \n" +
                "    public void before(JoinPoint point) {  \n" +
                "        // 获取到当前执行的方法名  \n" +
                "        String methodName = point.getSignature().getName();  \n" +
                "  \n" +
                "        boolean isSlave = false;  \n" +
                "  \n" +
                "        if (slaveMethodPattern.isEmpty()) {  \n" +
                "            // 当前Spring容器中没有配置事务策略，采用方法名匹配方式  \n" +
                "            isSlave = isSlave(methodName);  \n" +
                "        } else {  \n" +
                "            // 使用策略规则匹配  \n" +
                "            for (String mappedName : slaveMethodPattern) {  \n" +
                "                if (isMatch(methodName, mappedName)) {  \n" +
                "                    isSlave = true;  \n" +
                "                    break;  \n" +
                "                }  \n" +
                "            }  \n" +
                "        }  \n" +
                "  \n" +
                "        if (isSlave) {  \n" +
                "            // 标记为读库  \n" +
                "            DynamicDataSourceHolder.markSlave();  \n" +
                "        } else {  \n" +
                "            // 标记为写库  \n" +
                "            DynamicDataSourceHolder.markMaster();  \n" +
                "        }  \n" +
                "    }  \n" +
                "  \n" +
                "    /** \n" +
                "     * 判断是否为读库 \n" +
                "     * @param methodName \n" +
                "     * @return \n" +
                "     */  \n" +
                "    private Boolean isSlave(String methodName) {  \n" +
                "        // 方法名以query、find、get开头的方法名走从库  \n" +
                "        return StringUtils.startsWithAny(methodName, getSlaveMethodStart());  \n" +
                "    }  \n" +
                "  \n" +
                "    /** \n" +
                "     * 通配符匹配 \n" +
                "     *  \n" +
                "\n" +
                "     */  \n" +
                "    protected boolean isMatch(String methodName, String mappedName) {  \n" +
                "        return PatternMatchUtils.simpleMatch(mappedName, methodName);  \n" +
                "    }  \n" +
                "  \n" +
                "    /** \n" +
                "     * 用户指定slave的方法名前缀 \n" +
                "     * @param slaveMethodStart \n" +
                "     */  \n" +
                "    public void setSlaveMethodStart(String[] slaveMethodStart) {  \n" +
                "        this.slaveMethodStart = slaveMethodStart;  \n" +
                "    }  \n" +
                "  \n" +
                "    public String[] getSlaveMethodStart() {  \n" +
                "        if(this.slaveMethodStart == null){  \n" +
                "            // 没有指定，使用默认  \n" +
                "            return defaultSlaveMethodStart;  \n" +
                "        }  \n" +
                "        return slaveMethodStart;  \n" +
                "    }  \n" +
                "      \n" +
                "}  \n" +
                "```\n" +
                "\n" +
                "### 一主多从的实现\n" +
                "\n" +
                "很多实际使用场景下都是采用“一主多从”的架构的，所有我们现在对这种架构做支持，目前只需要修改DynamicDataSource即可。\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/9c85c3487ce1091d082bb333e58763b9?fid=940423185-250528-237356228540674&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-74E%2FyAtf1oY7d4a2NRgJ%2FE1RVoY%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434241085921720755&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "```\n" +
                "/** \n" +
                " * 定义动态数据源，实现通过集成Spring提供的AbstractRoutingDataSource，只需要实现determineCurrentLookupKey方法即可 \n" +
                " * 由于DynamicDataSource是单例的，线程不安全的，所以采用ThreadLocal保证线程安全，由DynamicDataSourceHolder完成。 \n" +
                " */  \n" +
                "public class DynamicDataSource extends AbstractRoutingDataSource {  \n" +
                "    private static final Logger LOGGER = LoggerFactory.getLogger(DynamicDataSource.class);  \n" +
                "    private Integer slaveCount;  \n" +
                "\n" +
                "    // 轮询计数,初始为-1,AtomicInteger是线程安全的  \n" +
                "    private AtomicInteger counter = new AtomicInteger(-1);  \n" +
                "    // 记录读库的key  \n" +
                "    private List<Object> slaveDataSources = new ArrayList<Object>(0);  \n" +
                "  \n" +
                "    @Override  \n" +
                "    protected Object determineCurrentLookupKey() {  \n" +
                "        // 使用DynamicDataSourceHolder保证线程安全，并且得到当前线程中的数据源key  \n" +
                "        if (DynamicDataSourceHolder.isMaster()) {  \n" +
                "            Object key = DynamicDataSourceHolder.getDataSourceKey();    \n" +
                "            return key;  \n" +
                "        }  \n" +
                "        Object key = getSlaveKey();  \n" +
                "        return key;  \n" +
                "    }  \n" +
                "  \n" +
                "    @SuppressWarnings(\"unchecked\")  \n" +
                "    @Override  \n" +
                "    public void afterPropertiesSet() {  \n" +
                "        super.afterPropertiesSet();  \n" +
                "  \n" +
                "        // 由于父类的resolvedDataSources属性是私有的子类获取不到，需要使用反射获取  \n" +
                "        Field field = ReflectionUtils.findField(AbstractRoutingDataSource.class, \"resolvedDataSources\");  \n" +
                "        field.setAccessible(true); // 设置可访问  \n" +
                "  \n" +
                "        try {  \n" +
                "            Map<Object, DataSource> resolvedDataSources = (Map<Object, DataSource>) field.get(this);  \n" +
                "            // 读库的数据量等于数据源总数减去写库的数量  \n" +
                "            this.slaveCount = resolvedDataSources.size() - 1;  \n" +
                "            for (Map.Entry<Object, DataSource> entry : resolvedDataSources.entrySet()) {  \n" +
                "                if (DynamicDataSourceHolder.MASTER.equals(entry.getKey())) {  \n" +
                "                    continue;  \n" +
                "                }  \n" +
                "                slaveDataSources.add(entry.getKey());  \n" +
                "            }  \n" +
                "        } catch (Exception e) {  \n" +
                "            LOGGER.error(\"afterPropertiesSet error! \", e);  \n" +
                "        }  \n" +
                "    }  \n" +
                "  \n" +
                "    /** \n" +
                "     * 轮询算法实现 \n" +
                "     *  \n" +
                "     * @return \n" +
                "     */  \n" +
                "    public Object getSlaveKey() {  \n" +
                "        // 得到的下标为：0、1、2、3……  \n" +
                "        Integer index = counter.incrementAndGet() % slaveCount;  \n" +
                "        if (counter.get() > 9999) { // 以免超出Integer范围  \n" +
                "            counter.set(-1); // 还原  \n" +
                "        }  \n" +
                "        return slaveDataSources.get(index);  \n" +
                "    }  \n" +
                "  \n" +
                "} \n" +
                "```\n" +
                "\n"}/>




            </div>
        );
    }
}

export default Mysql5;