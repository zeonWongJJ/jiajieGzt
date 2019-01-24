<template>
	<div class="reg">
		<div class="RegDiv">
			<!--<div class="Title">
				<h2>欢迎注册智谷科技企业云平台</h2>
			</div>-->
			<div class="errotip">
				{{errotip}}
			</div>
			<ul>
				<li style="margin-top: 0;">
					<div class="UserDiv">
<!--						<img src="../../assets/img/cname.png" />
-->						<input class="login_phone" type="text" v-model="enterpriseName" placeholder="请输入营业执照上的企业全称" />
					</div>
					<!--<span><em class="redx">*</em>企业全称</span>
					<input type="text" placeholder="请输入营业执照上的企业全称" v-model="enterpriseName" />-->
				</li>
				<li>
					<div class="PSWDiv">
						<!--<img src="../../assets/img/loginuser.png" />-->
						<input class="login_ren" type="text" v-model="IndividualName" placeholder="请输入用户名称" />
					</div>
					<!--<span><em class="redx">*</em>联系人</span>
					<input type="text" placeholder="输入联系人" v-model="IndividualName" />-->
				</li>
				<li>
					<div class="PSWDiv">
						<!--<img src="../../assets/img/titlepsw.png" />-->
						<input class="login_ren" type="password" v-model="Password" placeholder="请输入密码" />
					</div>
					<!--<span><em class="redx">*</em>登录密码</span>
					<input type="password" placeholder="请设置你的登录密码" v-model="Password" />-->
				</li>
				<li>
					<div class="PSWDiv">
						<!--<img src="../../assets/img/titlepsw.png" />-->
						<input class="login_ren" type="password" v-model="Password2" placeholder="重复输入登录密码" />
					</div>
					<!--<span><em class="redx">*</em>确认密码</span>
					<input type="password" placeholder="重复输入登录密码" v-model="Password2" />-->
				</li>
				<li>
					<div class="PSWDiv">
						<!--<img src="../../assets/img/loginphone.png" />-->
						<input class="login_ren" type="text" v-model="mobile" placeholder="输入手机号码" />
					</div>
					<!--<span><em class="redx">*</em>手机号码</span>
					<input type="text" placeholder="输入手机号码" v-model="mobile" />-->

				</li>
				<li>
					<div class="PSWDiv">
						<input class="login_ren" type="text" v-model="vcode" placeholder="验证码" style="margin-left: 14px;" />
						<button @click="fun_count_down">{{count_down}}{{count_down2}}</button>
					</div>
					<!--<span>&emsp;<em class="redx">*</em>验证码</span>
					<input type="text" placeholder="输入验证码" v-model="vcode" />-->
				</li>
			</ul>
			<div class="XieYi">
				<label><input type="checkbox"  @click.stop="tick_a" /><div class="show-box" /></label>
				<span>我已同意</span><span class="agreement" @click="xy">服务条款</span><span>，以及</span><span class="agreement">隐私政策</span>
			</div>
			<!--<button class="RegButton" v-if="tick" @click="register">注 册</button>-->
			<button class="RegButton" @click="register">注 册</button>
			<!--<button class="RegButton2" v-else="tick">注 册</button>-->
			<div class="logins">
				<router-link to="/"><span>登录</span></router-link>
			</div>

		</div>

		<div class="xy" v-show="xyshow">
			<div class="xy_box">
				<h1>《智谷网络科技有限公司服务协议》</h1>
				<div class="xy_p">
					<p>
						1、文。<br /> 汉·许慎《〈说文解字〉叙》:"盖依类象形，故谓之文;其后形声相益，即谓之字，"按，依类象形，即独体，为文;形声相益，即合体，为字。 《史记·秦始皇本纪》:"一法度衡石丈尺，车同轨，书同文字。" 北齐·颜之推《颜氏家训·勉学》:"夫文字者，坟籍根本，世之学徒，多不晓字。" 唐·韩愈《读〈鹖冠子〉》:"文字脱谬，为之正三十有五字。" 清·陈澧《东塾读书记·小学》:"声者象乎意而宣之者也，声不能传於异地，留於异时，於是乎书之为文字。" 鲁迅《汉文学史纲要》第一篇:"要之文字成就，所当绵历岁时，且由众手，全羣共喻，乃得流行，谁为作者，殊难确指，归功一圣，亦凭臆之说也。" 2、字记录的书面语。
						<br /> 唐·孟郊《老恨》诗:"无子抄文字，老吟多飘零。" 元·刘祁《归潜志》卷八:"雷 则云作文字无句法，委靡不振，不足规。" 《醒世恒言·钱秀才错占凤凰俦》:"有几个考学，看了舍亲的文字，都许他京解之才。" 夏丏尊、叶圣陶《文心》三:"一篇文字的题目，往往是完篇之后才取定的。" 3、字记录词和句子。
						<br /> 唐·韩愈《荆潭唱和诗序》:"搜奇抉怪，雕镂文字，与韦布里闾憔悴专一之士，较其毫厘分寸。" 4、公文;案卷。
						<br /> 宋·范仲淹《耀州谢上表》:"今后贼界差人赍到文字，如依前僭伪，立便发遣出界，不得收接。" 《宣和遗事》前集:"有那押司宋江接了文字看了，星夜走去石碣村，报与晁盖几个。" 《秦并六国平话》卷上:"各路州县接得文字，得知韩王被虏，诸将皆亡，未免具降书投降。" 《古今小说·简帖僧巧骗皇甫妻》:"钱大尹看罢，即时教押下一个所属去处，叫将山前行山定来。当时山定承了这件文字。" 5、奏疏或札子。
						<br /> 宋·朱弁《曲洧旧闻》卷八:"熙宁初议新法，中外惶骇，韩魏公有文字到朝廷，裕陵之意稍疑。" 明·冯梦龙《智囊补·上智·韩琦》:"一日，入札子，以山陵有事取覆，乞晚临，后上殿独对，谓官家不得惊，有一文字须进呈，说破只莫泄。"[1] 文字在语言学中指书面语等人们意思表达的视觉形式，古代把独体字叫做"文"，把合体字叫做"字"，如今联合起来叫做"文字"，文字的基本个体叫做"字"。在日常生活中，"文字"还可以指书面语、语言、文章、字等。视觉符号形式，突破口语的时间和空间限制。例如汉字、拉丁字母。 唐朝张怀作有《文字论》"论曰:文字者，总而为言。若分而为义，则文者祖父，字者子孙。察其物形，得其文理，故谓之曰文;母子相生，孽乳寝多，因名之为字。题於竹帛，则目之曰书。字之与书理亦归一因文也者，其道焕焉。日月星辰，天之文也;五岳四渎，地之文也;城阙翰仪，人之文也。文为用，相须而成，......" 视觉文字是简单的视觉图案再现口语所表达的意思，因而更加清晰，可以反复阅读，可以突破时间和空间的限制。 约定文字是人类约定创造的视觉形式。必要的时候可以重新约定，形成文字改革。 系统无论是语素文字、音节文字还是音素文字都有自己严密的系统，因此不能望文生义，改革也会牵一发动全身。 人类长期只有口语传递信息，用文字记事传递信息形成的书面语历史较短。系统的语言成为人和禽兽分离的重要工具，文字使人类能进入有历史记录的文明社会。把时空的影像变化转码成视觉可见的符号系统，使后人能通过间接的文字想象出画面，了解历史和学习技术经验。使文字成为文化的主要载体。 文字突破口语受到时间和空间的限制，是人类可以在书面语的基础上完整地传承人类的智慧和精神财富，使人类能够完善教育体系，提高自己的智慧，发展科学技术，进入文明社会。 普通文字是用简单图形形成，早期更加接近图画，更加接近几何线条。例如拉丁字母是简单的直线、弧线和点构成。汉字主要是由直线构成，所以叫做"方块汉字"。古代的甲骨文汉字，埃及象形文字和玛雅文字等古老文字图画性比较强。 由于特殊人群视觉能力的局限，还可以发明变异的视觉符号或者触觉符号来代替普通文字。盲文是为了适应没有视觉能力的盲人发明的触觉符号。手语是为了适应没有语音能力的聋哑人发明的用手舞动的动态视觉符号。旗语是为了适应航海等远距离听觉和视觉局限发明的用旗子舞动的动态视觉符号。这些代码文字，一般建立在表音文字或者表意文字的拼音方案的基础上，目前传统汉字是无法使用这种代码的。 在电子信息传输的初期，人们还采用阿拉伯数字代替汉字传输书面语。这种数字代码可以给任何文字编码。但是汉字因为数量多，需要专门的代码翻译人员才能使用。 有人把文字分成线性文字和非线性文字。这样不科学，因为无论是普通文字还是代码文字都有线条和点等视觉元素。 折叠书写方向
						<br /> 字在记录口语的时候，必然随着口语的词的顺序进行。但是把口语唯一的时间顺序转换成空间顺序的时候会遇到多种选择。早期文字例如埃及圣书体书写方向不确定。一般是写到哪儿就从哪儿继续写，叫做牛耕式写法。从一个水平方向开始，然后在一行结尾的位置直接到下一行开始反方向书写。 多数文字是采用希腊字母开始的书写方式:字母从左到右书写，行从上到下写。现代汉字采用横行文时也基本上这样书写。 但是阿拉伯文字、希伯来字母等是从右到左书写。中国新疆的维吾尔字母来自阿拉伯字母也是这样。 汉字在古代是直行文，从上到下书写，行从右到左。(古代匾额从右向左的横行文其实是一字一行的直行文。)现在一些情况下仍然采用这种书写方式。 文字可以分为三类:形意文字、意音文字和拼音文字，它们的关系不能简单地理解为进化的关系。 最原始的自源文字大多是象形文字，即通过象物来表达事物。随着表达越来越丰富，逐步产生了表音元素，变成意音文字，例如汉字中甲骨文中形声字比例为20%，到了《说文解字》就占到了45%;古代埃及文字中，也有几个象形文字来表达其音组合后对应事物的做法。苏美尔文字也经历过这个时期。 其中楔形文字彻底放弃了表意元素，今天我们看到的众多字母体系，从腓尼基字母借用古埃及象形文字的形而用其声，再经过一系列演变，分化出希腊字母，罗马字母，阿拉伯字母，西里尔字母，满文字母，等等，从古代到现在的字母文字，几乎都可追溯到腓尼基字母。在东亚，日本利用汉字，从其草书和楷书形态演化出平假名和片假名。 文字变化的机理和拼音文字遍天下的机理在哪里?很重要的一点是文字还没发生和成熟之前，言语已经高度成熟了，即使是没有文字的民族，它们的口语也能涵盖日常生产生活的诸多内容。如此，让文字对应语音，这是非常经济，而且在人类抽象思维没有蓬勃发展起来之时，这也几乎是唯一可行的。即便在汉字这样的意音系统里，虚词普遍采用了"假借"手法，譬如"然"即是今天的"燃"的本字，火字旁乃是为了和"虚词"用法相区分而加上去的(容易注意到，火字旁其实是和"然"字的火字底(四点底)相重复的)，这便是古人在虚词这样的事物面前捉襟见肘的表现，以今人度之，即如画一个抽象符号即可。 而零基础构建一套意音系统，工程量更是巨大，譬如"西夏文"，然其结果仍不甚理想。相比之下，表音文字工程量几乎可以忽略不计，一个没有或者只有非常原始的文字系统的民族，接触到外来民族先进成熟的文字系统时，往往就会形成"他源"表音文字，而像苏美尔文字这样，它的意音系统不能很好表达抽象事物，也会自发地向表音文字演化。 表音文字根据其记录的语音单位，譬如音节或者音素。日语的假名是音节文字，一个字写一个音节。英语的文字是音素文字，例如"study"用5个字(字母)写5 个音素。 音节文字又分成整体音节文字和非整体音节文字。日语假名是整体音节文字。非整体音节文字又分成半音素化音节文字和全音素化音节文字。半音素化音节文字例如阿拉伯文字，每个字(字母)内部的主体部件写音节中的辅音音素，元音音素可以不写或者用附加部件写。全音素化音节文字例如朝鲜文字，每个字(字母)内部的部件分别对应音节中全部音素。 从汉字跟汉语的个体单位的对应关系看，汉字是一种语素文字。从汉字的内部构造来看，可以分成形旁(根据意义构造的有理偏旁)、声旁(根据声音构造的有理偏旁)和配旁(没有根据的无理偏旁)3种偏旁部件。 早期汉字很接近图画。只有1个偏旁的字叫做独体字。多义一个偏旁的叫做合体字。合体字可以分成指示字、会意字和形声字，主要是后面两种，特别是形声字占80%。 (1)形声字
						<br /> 形声字由表示意义的形旁和表示读音的声旁两部分组成。拿构造最简单的形声字来说，形旁和声旁都是由独体字充当的。作为形声字的组成部分，这些独体字都是有音有义的字。不过形旁只取其义，不取其音，例如"鸠"字的偏旁"鸟";声旁则只取其音，不取其义，例如"鸠"字的偏旁"九"。 由于字义和字音的演变，有些形声字的形旁或声旁已失去了表意或表音的功能。例如"球"本来是一种玉的名称，所以以"玉"为形旁。"球"字不再指玉，这个形旁就没有作用了。再如"海"字本来以"每"为声旁。由于字音的变化，"海"和"每"的读音相去甚远，声旁"每"也就不起作用了。有的时候，形旁和声旁都丧失了原来的功能，例如"给、等、短"。这一类字已经不能再作为形声字看待了。
					</p>

				</div>

				<div class="but" @click="xy">
					确定
				</div>
			</div>
		</div>
        <div v-show="do_yn" class="do_ok">
        	<!--<img src="../../assets/img/tanokimg.png"/>-->
        	<span>{{do_ok}}</span>
        </div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				errotip: '', //报错提示
				count_down: '获取验证码', //获取验证码按钮
				count_down2: '', //获取验证码按钮
				mobile: '', //手机号码
				vcode: '', //输入验证码
				time: 60, //倒计时
				enterpriseName: '', //企业名
				IndividualName: '', //用户名
				Password: '', //登录密码
				Password2: '', //确定密码                                  
				dx_type: true, //阻止获取验证码按钮多次点
				tick: false, //checkbox
				xyshow: false, //协议
				re_do:'注册成功！',
				do_yn:false,
				do_ok:'注册成功!'
			}
		},
		methods: {
			
//			现在做这里可以实现
			
			//获取验证码事件
			fun_count_down() {
				let that = this
				let mobile = that.mobile;
				let re = /(1[3-9]\d{9}$)/;
				// 验证手机号
			that.axios.get(api.enrollVerification + mobile + api.enrollVerificationRepair)
  .then(function (res) {
    		if(res.data.status == '1') {
								that.$Message.success("验证码已发送");
//								that.fun_yzm();
							} else {
								//that.$Message.error(res.data.message);
								that.errotip = res.data.message;
							}
  })
  .catch(function (error) {
    console.log(error);
  });
			
				
			},
			//			现在做这里可以实现以上
			
			
			//			倒计时
			fun_yzm() {
				let that = this
				that.count_down = that.time
				that.count_down2 = '秒'
				if(that.time === 0) {
					that.count_down = '获取验证码'
					that.count_down2 = ''
					that.time = 60
					that.dx_type = true
				} else {
					that.count_down = that.time--
						setTimeout(that.fun_yzm, 1000);
				}
			},
			register() {
				let that = this;
				let re = /(1[3-9]\d{9}$)/;
				if(that.enterpriseName == '') {
					that.errotip = "请输入企业名称！";
					/*that.$Message.error("请输入企业名称")*/
					return false;
				} else if(that.enterpriseName.length > 50) {
					that.errotip = "企业名称不能超过50个字！";
					/*that.$Message.error("企业名称不能超过50个字")*/
					return false;
				} else if(that.IndividualName == '') {
					that.errotip = "请输入用户名称！";
					/*that.$Message.error("请输入用户名称")*/
					return false;
				} else if(that.Password == '') {
					that.errotip = "请输入密码！";
					/*that.$Message.error("请输入密码")*/
					return false;
				} else if(that.Password.length < 6) {
					that.errotip = "密码不能小与6位！";
					/*that.$Message.error("密码不能小与6位")*/
					return false;
				} else if(that.Password2 != that.Password) {
					that.errotip = "密码不一致！";
					/*that.$Message.error("密码不一致，")*/
					return false;
				}
				// 验证手机号
				else if(that.mobile == "") {
					that.errotip = "手机号不能为空！";
					/*that.$Message.error("手机号不能为空");*/

					return false;
				} else if(!re.test(that.mobile)) {
					that.errotip = "请输入正确的手机号！";
					/*that.$Message.error("请输入正确的手机号");*/
					return false;
				} else if(that.vcode == '') {
					that.errotip = "验证码不能为空！";
					/*that.$Message.error("验证码不能为空");*/
					return false;
				}
				//else验证成功返回提示
				else {
					let newUser = {}
					newUser.corp = that.enterpriseName; //企业名
					newUser.user = that.IndividualName; //用户名
					newUser.password = that.Password; //登录密码
					newUser.passwdCheck = that.Password2; //确定密码
					newUser.mobile = that.mobile; //手机号码
					newUser.verifyCode = that.vcode; //验证码
					that.axios({ //发送请求
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.register,
							data: api.convertParam(newUser),
						})
						.then(function(res) {
							console.log(res.data);
							if(res.data.status == 1) {
								//								that.handleSpinCustom();
								//that.$Message.success("注册成功");
								that.do_yn=true;
								setTimeout(() => {
									that.$router.push({
										path: '/'
									})
								}, 2000);
							} else {
								that.errotip = res.data.message;
								//that.$Message.error(res.data.message);
							}
						}).catch(function(error) { //抓捕错误信息
							console.log(error + 'aaaaaa');

						});
				}
			},
			tick_a() {
				let that = this;
				that.tick = !that.tick
			},
			xy() {
				let that = this;
				that.xyshow = !that.xyshow
			},

		},

		mounted() {
this.register()
		},
	}
</script>

<style scoped>
	input,
	button,
	select,
	textarea {
		outline: none;
		color: #333333;
	}
	
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px white inset;
	}
	
	textarea {
		resize: none
	}
	
	input:focus {
		outline: none;
		background-color: white;
		border: 1px solid red;
	}
	
	input:hover {
		outline: none;
		background-color: white;
	}
	
	.reg {
		position: absolute;
		top: 0;
		left: 0;
		min-width: 980px;
		width: 100vw;
		height: 100vh;
	}
	
	.reg .RegDiv {
		padding: 28px 40px 43px 40px;
		position: absolute;
		margin-top: -276px;
		top: 50%;
		right: 11.578vw;
		background-color: #112e44;
		border: none;
		border-radius: 4px;
		width: 387px;
	}
	
	.reg .RegDiv .Title {
		background-color: #f9f9f9;
		padding: 1.578vw 0;
	}
	
	.reg .RegDiv .Title h2 {
		margin-left: 4.052vw;
		/*font-size: 0.842vw;*/
	}
	
	.errotip {
		display: flex;
		align-items: center;
		color: #e92552;
		font-size: 16px;
		height: 15px;
	}
	
	.reg .RegDiv ul li {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		margin-top: 20px;
		margin-bottom: 20px;
		width: 300px;
	}
	
	.reg .RegDiv ul li span {
		margin-left: 3.789vw;
		margin-right: 1vw;
		font-size: 14px;
	}
	
	.reg .RegDiv ul li input {
		height: 28px;
		width: 230px;
		border: 1px solid #e8e8e8;
		border-radius: 5px;
		padding-left: 5px;
		font-size: 14px;
	}
	
	.reg .RegDiv ul li button {
		width: 110px;
		height: 100%;		
		padding-left: 10px;
		padding-right: 10px;
		font-size: 14px;
		background-color: rgb(0, 0, 0, 0);
		border: none;
		border-left: 1px solid #eee;
		border-radius: 5px;
		cursor: pointer;
		color: #f2a142;
		background-color: #fff;
	}
	
	.XieYi {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		color: #cccccc;
	}
	
	.XieYi:hover {
		color: #eeeeee;
	}
	
	.XieYi:hover .agreement {
		color: #eeeeee;
	}
	
	.reg .RegDiv .XieYi label {
		position: relative;
		cursor: pointer;
		width: 14px;
		height: 14px;
	}
	
	.reg .RegDiv .XieYi label input {
		cursor: pointer;
		opacity: 0;
	}
	
	.reg .RegDiv .XieYi label input:checked+.show-box {
		background: #269edc;
	}
	
	.reg .RegDiv .XieYi label .show-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 14px;
		height: 14px;
		border-radius: 2px;
		border: 1px solid #d8d8d8;
		background: white;
	}
	
	.reg .RegDiv .XieYi label .show-box:before {
		content: '';
		position: absolute;
		top: 1px;
		left: 3px;
		width: 5px;
		height: 9px;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}
	
	.reg .RegDiv .XieYi span {
		font-size: 14px;
		padding: 0 0 0 8px;
	}
	
	.reg .RegDiv .RegButton {
		width: 300px;
		height: 40px;
		color: white;
		background-color: #03b8cc;
		border: none;
		border-radius: 2px;
		margin: 20px 0;
		font-size: 16px;
		cursor: pointer;
	}
	
	.reg .RegDiv .RegButton2 {
		width: 300px;
		height: 40px;
		background-color: #03b8cc;
		color: #fff;
		border: none;
		border-radius: 2px;
		margin: 20px 0;
		font-size: 16px;
	}
	
	.reg .RegDiv .RegButton:hover,
	.RegButton2:hover {
		cursor: pointer;
		background-color: #33cde5;
	}
	
	.agreement {
		color: #cccccc;
		cursor: pointer;
		/*border-bottom: 1px solid #0000FF;*/
	}
	
	.agreement:before {
		content: "";
		height: 1px;
		background: #cccccc;
		display: block;
		/*1.首先使伪类显示方式为块级元素*/
		position: relative;
		bottom: -20px;
	}
	
	.redx {
		/*font-size: 12px;*/
		color: red;
		margin: 0 10px 0 0;
	}
	
	.xy {
		position: fixed;
		top: 0;
		left: 0;
		/*margin: 20px 0 0 -400px;*/
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.2);
	}
	
	.xy_box {
		width: 900px;
		height: 635;
		background: #fff;
		margin: 20px auto;
		padding: 10px;
		border-radius: 5px;
	}
	
	.xy_box h1 {
		width: 100%;
		text-align: center;
		margin-bottom: 10px;
	}
	
	.xy_p {
		width: 100%;
		height: 480px;
		overflow: auto;
		overflow-x: hidden;
		background: #f8f8f8;
		padding: 20px;
		border-radius: 5px;
	}
	
	.xy_p::-webkit-scrollbar {
		display: none;
	}
	
	.xy_p p {
		line-height: 24px;
		font-size: 14px;
	}
	
	.but {
		width: 200px;
		height: 44px;
		line-height: 44px;
		border: 1px solid #111;
		margin: 25px auto;
		text-align: center;
		border: 0;
		border-radius: 15px;
		cursor: pointer;
		color: white;
		background-color: #faa600;
	}
	
	.logins {
		text-align: right;
		padding-right: 20px;
		color: #868686;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	
	.logins a {
		display: flex;
		align-items: center;
	}
	
	.logins a span {
		position: relative;
		color: #fff;
		font-size: 16px;
	}
	
	.logins a:hover span:before {
		content: '';
		position: absolute;
		bottom: 1px;
		width: 100%;
		height: 1px;
		background-color: #eeeeee;
	}
	
	.logins img {
		margin-right: 6px;
	}
	
	.demo-spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;
	}
	
	.reg .RegDiv .UserDiv,
	.PSWDiv {
		width: 300px;
		height: 40px;
		margin: 0 auto;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		border: 1px solid #e8e8e8;
		border-radius: 2px;
		background-color: #fff;
	}
	
	.reg .RegDiv .UserDiv:hover,
	.PSWDiv:hover {
		background-color: #faffbd;
	}
	
	.reg .RegDiv .UserDiv input {
		border: none;
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	.reg .RegDiv .UserDiv input:hover {
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	.reg .RegDiv .UserDiv input:focus {
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	.reg .RegDiv .PSWDiv input {
		border: none;
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	.reg .RegDiv .PSWDiv input:hover {
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	.reg .RegDiv .PSWDiv input:focus {
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	.reg .RegDiv .UserDiv,
	.PSWDiv .LoginDiv .PSWDiv {
		margin-top: 5px;
	}
	
	.reg .RegDiv .UserDiv:hover,
	.PSWDiv:hover {
		border-color: #269edc;
	}
	
	.reg .RegDiv .UserDiv img,
	.PSWDiv img {
		height: 22px;
		margin-left: 14px;
		margin-right: 14px;
	}
	
	.reg .RegDiv .UserDiv input,
	.PSWDiv input {
		width: 82%;
		border: none;
		background-color: white;
		font-size: 14px;
	}
	.do_ok{
		width: 260px;
		height: 78px;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		margin:-36px 0 0 -130px ;
		box-shadow: 0px 0px 30px #00c1de;
	}
	.do_ok img{
		width: 44px;
		height: 44px;
		margin-right: 30px;
	}
	.do_ok span{
		font-size: 18px;
		color: #415161;
	}
</style>