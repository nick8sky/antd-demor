import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Consul1 extends Component {
    render() {


        return (
            <div>

                <Markdown source={"##Introduction to Consul\n" +
                "\n 参考： https://www.consul.io/docs/internals/architecture.html\n\n" +
                "**What is Consul?**\n" +
                "\n" +
                "- **Service Discovery**:  use Consul to *discover* providers of a given service. Using either DNS or HTTP, applications can easily find the services they depend upon.\n" +
                "- **Health Checking**: Consul clients can provide any number of health checks \n" +
                "- **KV Store**: including dynamic configuration\n" +
                "- **Multi Datacenter**: Consul supports multiple datacenters out of the box. This means users of Consul do not have to worry about building additional layers of abstraction to grow to multiple regions.\n" +
                "\n" +
                "**How to use it**\n" +
                "\n" +
                "```\n" +
                "cd /Users/sunkaixiang/pro/consul-templet\n" +
                "$ consul\n" +
                "Usage: consul [--version] [--help] <command> [<args>]\n" +
                "\n" +
                "Available commands are:\n" +
                "    agent          Runs a Consul agent\n" +
                "    catalog        Interact with the catalog\n" +
                "    event          Fire a new event\n" +
                "    exec           Executes a command on Consul nodes\n" +
                "    force-leave    Forces a member of the cluster to enter the \"left\" state\n" +
                "    info           Provides debugging information for operators.\n" +
                "    join           Tell Consul agent to join cluster\n" +
                "    keygen         Generates a new encryption key\n" +
                "    keyring        Manages gossip layer encryption keys\n" +
                "    kv             Interact with the key-value store\n" +
                "    leave          Gracefully leaves the Consul cluster and shuts down\n" +
                "    lock           Execute a command holding a lock\n" +
                "    maint          Controls node or service maintenance mode\n" +
                "    members        Lists the members of a Consul cluster\n" +
                "    monitor        Stream logs from a Consul agent\n" +
                "    operator       Provides cluster-level tools for Consul operators\n" +
                "    reload         Triggers the agent to reload configuration files\n" +
                "    rtt            Estimates network round trip time between nodes\n" +
                "    snapshot       Saves, restores and inspects snapshots of Consul server state\n" +
                "    validate       Validate config files/directories\n" +
                "    version        Prints the Consul version\n" +
                "    watch          Watch for changes in Consul\n" +
                "```\n" +
                "\n" +
                "The agent can run either in server or client mode. Each datacenter must have at least one server, a cluster of 3 or 5 servers is recommended.\n" +
                "\n" +
                "All other agents run in client mode. A client is a very lightweight process that registers services, runs health checks, and forwards queries to servers. The agent must be running on every node that is part of the cluster.\n" +
                "\n" +
                "For simplicity, we'll start the Consul agent in development mode for now. This mode is useful for bringing up a single-node Consul environment quickly and easily. It is not intended(打算) to be used in production as it does not persist any state.\n" +
                "\n" +
                "```\n" +
                "$ consul agent -dev\n" +
                "==> Starting Consul agent...\n" +
                "==> Consul agent running!\n" +
                "           Version: 'v1.0.2'\n" +
                "           Node ID: 'f0aca8b3-5368-5574-5cf2-909cd259eb35'\n" +
                "         Node name: 'sunkaixiangdeMacBook-Pro.local'\n" +
                "        Datacenter: 'dc1' (Segment: '<all>')\n" +
                "            Server: true (Bootstrap: false)\n" +
                "       Client Addr: [127.0.0.1] (HTTP: 8500, HTTPS: -1, DNS: 8600)\n" +
                "      Cluster Addr: 127.0.0.1 (LAN: 8301, WAN: 8302)\n" +
                "           Encrypt: Gossip: false, TLS-Outgoing: false, TLS-Incoming: false\n" +
                "\n" +
                "==> Log data will now stream in as it occurs:\n" +
                "\n" +
                "    2018/02/28 13:36:56 [DEBUG] Using random ID \"f0aca8b3-5368-5574-5cf2-909cd259eb35\" as node ID\n" +
                "   ...\n" +
                "    2018/02/28 13:36:56 [DEBUG] raft: Vote granted from f0aca8b3-5368-5574-5cf2-909cd259eb35 in term 2. Tally: 1\n" +
                "    2018/02/28 13:36:56 [INFO] raft: Election won. Tally: 1\n" +
                "    2018/02/28 13:36:56 [INFO] raft: Node at 127.0.0.1:8300 [Leader] entering Leader state\n" +
                "    2018/02/28 13:36:56 [INFO] consul: cluster leadership acquired\n" +
                "    2018/02/28 13:36:56 [INFO] consul: New leader elected: sunkaixiangdeMacBook-Pro.local\n" +
                "    2018/02/28 13:36:56 [DEBUG] consul: Skipping self join check for \"sunkaixiangdeMacBook-Pro.local\" since the cluster is too small\n" +
                "    2018/02/28 13:36:56 [INFO] consul: member 'sunkaixiangdeMacBook-Pro.local' joined, marking health alive\n" +
                "    ...\n" +
                "==> Newer Consul version available: 1.0.6 (currently running: 1.0.2)\n" +
                "```\n" +
                "\n" +
                " From the log data, you can see that **our agent is running in server mode** and **has claimed(声称) leadership of the cluster**. Additionally, the local member has been marked as a healthy member of the cluster，and self jioned the cluster.\n" +
                "\n" +
                "\n" +
                "\n" +
                "If you run consul members in another terminal, you can see the members of the Consul cluster. We'll cover joining clusters in the next section, but for now, you should only see one member (yourself):\n" +
                "\n" +
                "```\n" +
                "$ consul members\n" +
                "Node                            Address         Status  Type    Build  Protocol  DC   Segment\n" +
                "sunkaixiangdeMacBook-Pro.local  127.0.0.1:8301  alive   server  1.0.2  2         dc1  <all>\n" +
                "```\n" +
                "\n" +
                "The output shows our own node, the address it is running on, its health state, its role in the cluster, and some version information. Additional metadata can be viewed by providing the `-detailed` flag.\n" +
                "\n" +
                "```\n" +
                "consul members -detailed\n" +
                "```\n" +
                "\n" +
                "The output of the members (consul members) command is based on the gossip protocol and is eventually consistent(最终一致性). That is, at any point in time(在任何时点), the view of the world as seen by your local agent may not exactly match the state on the servers. For a strongly consistent view of the world, use the **HTTP API** as it forwards the request to the Consul servers:\n" +
                "\n" +
                "```\n" +
                "$ curl localhost:8500/v1/catalog/nodes\n" +
                "[\n" +
                "    {\n" +
                "        \"ID\": \"f0aca8b3-5368-5574-5cf2-909cd259eb35\",\n" +
                "        \"Node\": \"sunkaixiangdeMacBook-Pro.local\",\n" +
                "        \"Address\": \"127.0.0.1\",\n" +
                "        \"Datacenter\": \"dc1\",\n" +
                "        \"TaggedAddresses\": {\n" +
                "            \"lan\": \"127.0.0.1\",\n" +
                "            \"wan\": \"127.0.0.1\"\n" +
                "        },\n" +
                "        \"Meta\": {\n" +
                "            \"consul-network-segment\": \"\"\n" +
                "        },\n" +
                "        \"CreateIndex\": 5,\n" +
                "        \"ModifyIndex\": 6\n" +
                "    }\n" +
                "]\n" +
                "```\n" +
                "\n" +
                "In addition to the HTTP API, the **DNS interface** can be used to query the node. Note that you have to make sure to point your DNS lookups to the Consul agent's DNS server which runs on port 8600 by default.\n" +
                "\n" +
                "```\n" +
                "$ dig @127.0.0.1 -p 8600 sunkaixiangdeMacBook-Pro.node.consul\n" +
                "\n" +
                "; <<>> DiG 9.9.7-P3 <<>> @127.0.0.1 -p 8600 sunkaixiangdeMacBook-Pro.node.consul\n" +
                "; (1 server found)\n" +
                ";; global options: +cmd\n" +
                ";; Got answer:\n" +
                ";; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 48067\n" +
                ";; flags: qr aa rd; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1\n" +
                ";; WARNING: recursion requested but not available\n" +
                "\n" +
                ";; OPT PSEUDOSECTION:\n" +
                "; EDNS: version: 0, flags:; udp: 4096\n" +
                ";; QUESTION SECTION:\n" +
                ";sunkaixiangdeMacBook-Pro.node.consul. IN A\n" +
                "\n" +
                ";; AUTHORITY SECTION:\n" +
                "consul.\t\t\t0\tIN\tSOA\tns.consul. hostmaster.consul. 1519796819 3600 600 86400 0\n" +
                "\n" +
                ";; Query time: 2 msec\n" +
                ";; SERVER: 127.0.0.1#8600(127.0.0.1)\n" +
                ";; WHEN: Wed Feb 28 13:46:59 CST 2018\n" +
                ";; MSG SIZE  rcvd: 115\n" +
                "```\n" +
                "\n" +
                "### Registering Services\n" +
                "\n" +
                "Using idea lauch a consul register **-merchant-manage service.\n" +
                "\n" +
                "```\n" +
                "### ### ### ### ### ### ### # consul ### ### ### ### ### ### ### ### ### \n" +
                "spring.cloud.consul.host=localhost\n" +
                "spring.cloud.consul.port=8500\n" +
                "spring.cloud.consul.discovery.healthCheckUrl=http.//localhost.${server.port}/health\n" +
                "spring.cloud.consul.discovery.healthCheckInterval=15s\n" +
                "spring.cloud.consul.discovery.instance-id=${spring.application.name}-${user.name}\n" +
                "spring.cloud.consul.discovery.enabled=true\n" +
                "spring.cloud.consul.discovery.heartbeat.enabled=true\n" +
                "spring.cloud.consul.discovery.tags=foo=bar, baz\n" +
                "```\n" +
                "\n" +
                "Let's first query our service using the DNS API. For the DNS API, the DNS name for services is NAME.service.consul. \n" +
                "\n" +
                "```\n" +
                "$ dig @127.0.0.1 -p 8600 **-merchant-manage.service.consul\n" +
                "\n" +
                "; <<>> DiG 9.9.7-P3 <<>> @127.0.0.1 -p 8600 **-merchant-manage.service.consul\n" +
                "; (1 server found)\n" +
                ";; global options: +cmd\n" +
                ";; Got answer:\n" +
                ";; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 43897\n" +
                ";; flags: qr aa rd; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1\n" +
                ";; WARNING: recursion requested but not available\n" +
                "\n" +
                ";; OPT PSEUDOSECTION:\n" +
                "; EDNS: version: 0, flags:; udp: 4096\n" +
                ";; QUESTION SECTION:\n" +
                ";**-merchant-manage.service.consul. IN A\n" +
                "\n" +
                ";; ANSWER SECTION:\n" +
                "**-merchant-manage.service.consul. 0\tIN A\t192.168.3.72\n" +
                "```\n" +
                "\n" +
                "As you can see, an A record was returned with the IP address of the node on which the service is available. A records can only hold IP addresses.\n" +
                "\n" +
                "\n" +
                "\n" +
                "You can also use the DNS API to retrieve the entire address/port pair as a SRV record:\n" +
                "\n" +
                "```\n" +
                "$ dig @127.0.0.1 -p 8600 **-merchant-manage.service.consul SRV\n" +
                "...\n" +
                ";**-merchant-manage.service.consul. IN SRV\n" +
                ";; ANSWER SECTION:\n" +
                "**-merchant-manage.service.consul. 0\tIN SRV\t1 1 30014 c0a80348.addr.dc1.consul.\n" +
                "\n" +
                ";; ADDITIONAL SECTION:\n" +
                "c0a80348.addr.dc1.consul. 0\tIN\tA\t192.168.3.72\n" +
                "```\n" +
                "\n" +
                "The SRV record says that the web service is running on port 30014 and exists on the node c0a80348.addr.dc1.consul. , An additional section is returned by the DNS with the A record for that node.\n" +
                "\n" +
                "\n" +
                "\n" +
                "Finally, we can also use the DNS API to filter services by tags. The format for tag-based service queries is **TAG.NAME.service.consul**.\n" +
                "\n" +
                "```\n" +
                "$ dig @127.0.0.1 -p 8600 baz.**-merchant-manage.service.consul\n" +
                "...\n" +
                ";; QUESTION SECTION:\n" +
                ";baz.**8-merchant-manage.service.consul. IN A\n" +
                "\n" +
                ";; ANSWER SECTION:\n" +
                "baz.**-merchant-manage.service.consul. 0 IN A 192.168.3.72\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "In addition to the DNS API, the HTTP API can be used to query services:\n" +
                "\n" +
                "```\n" +
                "$ curl http://localhost:8500/v1/catalog/service/**-merchant-manage\n" +
                "[\n" +
                "    {\n" +
                "        \"ID\": \"f0aca8b3-5368-5574-5cf2-909cd259eb35\",\n" +
                "        \"Node\": \"sunkaixiangdeMacBook-Pro.local\",\n" +
                "        \"Address\": \"127.0.0.1\",\n" +
                "        \"Datacenter\": \"dc1\",\n" +
                "        \"TaggedAddresses\": {\n" +
                "            \"lan\": \"127.0.0.1\",\n" +
                "            \"wan\": \"127.0.0.1\"\n" +
                "        },\n" +
                "        \"NodeMeta\": {\n" +
                "            \"consul-network-segment\": \"\"\n" +
                "        },\n" +
                "        \"ServiceID\": \"**-merchant-manage-sunkaixiang\",\n" +
                "        \"ServiceName\": \"**-merchant-manage\",\n" +
                "        \"ServiceTags\": [\n" +
                "            \"foo=bar\",\n" +
                "            \"baz\"\n" +
                "        ],\n" +
                "        \"ServiceAddress\": \"192.168.3.72\",\n" +
                "        \"ServicePort\": 30014,\n" +
                "        \"ServiceEnableTagOverride\": false,\n" +
                "        \"CreateIndex\": 128,\n" +
                "        \"ModifyIndex\": 128\n" +
                "    }\n" +
                "]\n" +
                "```\n" +
                "\n" +
                " health checks \n" +
                "\n" +
                "```\n" +
                "$ curl 'http://localhost:8500/v1/health/service/**-merchant-manage?passing'\n" +
                "[\n" +
                "    {\n" +
                "        ...\n" +
                "        \"Checks\": [\n" +
                "            {\n" +
                "                \"Node\": \"sunkaixiangdeMacBook-Pro.local\",\n" +
                "                \"CheckID\": \"serfHealth\",\n" +
                "                \"Name\": \"Serf Health Status\",\n" +
                "                \"Status\": \"passing\",\n" +
                "                \"Output\": \"Agent alive and reachable\",\n" +
                "                \"CreateIndex\": 5,\n" +
                "                \"ModifyIndex\": 5\n" +
                "            },\n" +
                "            {\n" +
                "                \"Node\": \"sunkaixiangdeMacBook-Pro.local\",\n" +
                "                \"CheckID\": \"service:**-merchant-manage-sunkaixiang\",\n" +
                "                \"Name\": \"Service '**-merchant-manage' check\",\n" +
                "                \"Status\": \"passing\",\n" +
                "                \"Notes\": \"\",\n" +
                "                \"Output\": \"\",\n" +
                "                \"ServiceID\": \"**-merchant-manage-sunkaixiang\",\n" +
                "                \"ServiceName\": \"**-merchant-manage\",\n" +
                "                \"ServiceTags\": [\n" +
                "                    \"foo=bar\",\n" +
                "                    \"baz\"\n" +
                "                ]\n" +
                "                ...\n" +
                "            }\n" +
                "        ]\n" +
                "    }\n" +
                "]\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "**Updating Services**\n" +
                "\n" +
                "Service definitions can be updated by changing configuration files and sending a SIGHUP to the agent. This lets you update services without any downtime or unavailability to service queries.\n" +
                "\n" +
                "Alternatively, the HTTP API can be used to add, remove, and modify services dynamically.\n" +
                "\n" +
                "\n" +
                "\n" +
                "### Consul Cluster\n" +
                "\n" +
                " In this step, we'll create a real cluster with multiple members.\n" +
                "\n" +
                "When a Consul agent is started, it begins without knowledge of any other node: it is an isolated cluster of one. To learn about other cluster members, the agent must *join* an existing cluster. To join an existing cluster, it only needs to know about a *single* existing member. After it joins, the agent will gossip with this member and quickly discover the other members in the cluster. A Consul agent can join any other agent, not just agents in server mode.\n" +
                "\n" +
                " \n" +
                "\n" +
                "In our previous examples, we used the *-dev*  flag to quickly set up a development server. However, this is not sufficient(足够) for use in a clustered environment. We will omit(忽略) the *-dev*  flag from here on, and instead specify our clustering flags as outlined below.\n" +
                "\n" +
                "The first node will act as our sole(唯一) server in this cluster, and we indicate(表明) this with the server switch.\n" +
                "\n" +
                "The *-bootstrap-expect*  flag hints(提示) to the Consul server the number of additional server nodes we are expecting to join. The purpose of this flag is to delay the bootstrapping of the replicated log until the expected number of servers has successfully joined. \n" +
                "\n" +
                "We've included the  *-enable-script-checks*  flag set to true in order to enable health checks that can execute external scripts. This will be used in examples later. For production use, you'd want to configure ACLs  to control the ability to register arbitrary(任意) scripts.\n" +
                "\n" +
                "Finally, we add the *config-dir*  flag, marking where service and check definitions can be found.\n" +
                "\n" +
                "\n" +
                "\n" +
                "We will also specify a bind address: this is the address that Consul listens on, and it must be accessible by all other nodes in the cluster. While a bind address is not strictly(绝对) necessary, it's always best to provide one. Consul will by default attempt to listen on all IPv4 interfaces on a system, but will fail to start with an error if multiple private IPs are found. Since production servers often have multiple interfaces, specifying a bind address assures that you will never bind Consul to the wrong interface.\n" +
                "\n" +
                "\n" +
                "\n" +
                "All together, these settings yield a consul agent command like this:\n" +
                "\n" +
                "```\n" +
                "./consul agent -server -bootstrap-expect=2     -data-dir=/tmp/consul -node=agent-one -bind=192.168.23.1     -enable-script-checks=true -config-dir=/Users/sunkaixiang/pro/consul-templet/consul.d -ui\n" +
                "```\n" +
                "\n" +
                "**bootstrap-expect**一定要和node个数一致\n" +
                "\n" +
                "Now, in another vm:\n" +
                "\n" +
                " All together, these settings yield a consul agent command like this:\n" +
                "\n" +
                "```\n" +
                "./consul agent -data-dir=/home/sunkx2/consul/data -node=agent-two \\\n" +
                "    -bind=192.168.23.164 -enable-script-checks=true -config-dir=/home/sunkx2/consul/config\n" +
                "    -client=192.168.23.164\n" +
                "```\n" +
                "\n" +
                "At this point, you have two Consul agents running: one server and one client. The two Consul agents still don't know anything about each other and are each part of their own single-node clusters. You can verify this by running consul members against each agent and noting that only one member is visible to each agent.\n" +
                "\n" +
                "最后的-client=192.168.23.164是让其他程序可以连接这台机器。不然默认为127.0.0.1，对server/node都适用。\n" +
                "\n" +
                "### Joining a Cluster\n" +
                "\n" +
                " ```\n" +
                "$server\n" +
                "consul join 192.168.23.164\n" +
                "consul join 192.168.23.149\n" +
                " ```\n" +
                "\n" +
                " run *consul members*   against each agent:\n" +
                "\n" +
                "```\n" +
                "consul members\n" +
                "Node         Address              Status  Type    Build  Protocol  DC   Segment\n" +
                "agent-one    192.168.23.1:8301    alive   server  1.0.2  2         dc1  <all>\n" +
                "agent-three  192.168.23.149:8301  alive   client  0.9.3  2         dc1  <default>\n" +
                "agent-two    192.168.23.164:8301  alive   client  0.9.3  2         dc1  <default>\n" +
                "```\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/m4/a5809028a1339e0b.png)\n" +
                "\n" +
                "** 1、cluster中不同的node之间是可以互相调用的；2、即便agent(server/node)挂了，程序依旧可以调用**\n" +
                "\n" +
                "\n" +
                "\n" +
                "### Auto-joining a Cluster on Start\n" +
                "\n" +
                "```\n" +
                "consul agent   -data-dir /data/consul0 -node=cn4 -bind=192.168.1.199 -config-dir /etc/consul.d -enable-script-checks=true  -datacenter=dc1  -join 192.168.1.202\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "### Health Checks\n" +
                "\n" +
                "Health checks are a critical(至关重要的)  component of service discovery that prevent(防止) using services that are unhealthy.\n" +
                "\n" +
                "```\n" +
                "spring.cloud.consul.discovery.healthCheckUrl=http.//localhost.${server.port}/health\n" +
                "spring.cloud.consul.discovery.healthCheckInterval=15s\n" +
                "spring.cloud.consul.discovery.heartbeat.enabled=true\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "### KV Data\n" +
                "\n" +
                "**set a kv**\n" +
                "\n" +
                "```\n" +
                "$ consul kv put redis/config/minconns 1\n" +
                "Success! Data written to: redis/config/minconns\n" +
                "```\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/5974b09db6c359b5.png)\n" +
                "\n" +
                "最后一个minconns为k,里面的值为v\n" +
                "\n" +
                "\n" +
                "\n" +
                "**get a kv**\n" +
                "\n" +
                "```\n" +
                "$ consul kv get redis/config/minconns\n" +
                "1\n" +
                "```\n" +
                "\n" +
                "Consul retains additional metadata about the field, which is retrieved using the *-detailed*  flag:\n" +
                "\n" +
                "```\n" +
                "consul kv get -detailed redis/config/minconns\n" +
                "```\n" +
                "\n" +
                "For the key \"redis/config/users/admin\", we set a flag value of 42. All keys support setting a 64-bit integer flag value. This is not used internally by Consul, but it can be used by clients to add meaningful metadata to any KV.\n" +
                "\n" +
                "**list all the keys** \n" +
                "\n" +
                "```\n" +
                "$ consul kv get -recurse\n" +
                "redis/config/maxconns:25\n" +
                "redis/config/minconns:1\n" +
                "redis/config/users/admin:abcd1234\n" +
                "```\n" +
                "\n" +
                "**delete a key**\n" +
                "\n" +
                "```\n" +
                "$ consul kv delete redis/config/minconns\n" +
                "```\n" +
                "\n" +
                "**delete an entire prefix keys**\n" +
                "\n" +
                "```\n" +
                "$ consul kv delete -recurse redis\n" +
                "```\n" +
                "\n" +
                "**atomic key**?\n" +
                "\n" +
                "Consul can provide atomic key updates using a Check-And-Set operation. To perform a CAS operation, specify the -cas  flag:\n" +
                "\n" +
                "```\n" +
                "$ consul kv put -cas -modify-index=123 foo bar\n" +
                "Error! Did not write to foo: CAS failed\n" +
                "```"}/>



            </div>
        );
    }
}

export default Consul1;