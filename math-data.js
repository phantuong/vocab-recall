const MATH_LESSONS = [
/* CHỦ ĐỀ 1 */
{theme:1,title:'Số và chữ số',theory:[
'Có 10 số có một chữ số: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.',
'Các số lẻ có một chữ số là 1, 3, 5, 7, 9. Các số chẵn là 0, 2, 4, 6, 8.',
'Số lớn nhất có 1 chữ số là 9; số nhỏ nhất có 1 chữ số là 0.',
'Số nhỏ nhất có 2 chữ số là 10; số lớn nhất có 2 chữ số là 99.',
'1 chục = 10 đơn vị; 10 chục = 100.',
'Trong số có hai chữ số, chữ số bên trái chỉ số chục và chữ số bên phải chỉ số đơn vị.',
'Số liền trước của một số kém số đó 1 đơn vị; số liền sau hơn số đó 1 đơn vị.'
],questions:[
['Số lớn nhất có một chữ số là số nào?',['8','9','10','99'],1],
['Số nhỏ nhất có hai chữ số là số nào?',['0','1','9','10'],3],
['Trong số 47, chữ số 4 chỉ mấy chục?',['4 đơn vị','4 chục','7 chục','47 chục'],1],
['Số liền sau của 19 là số nào?',['18','19','20','21'],2],
['Số nào là số chẵn?',['7','9','11','12'],3]
]},
{theme:1,title:'Phép cộng, trừ',theory:[
'Cộng, trừ trong phạm vi 10 là nền tảng của các phép tính tiếp theo.',
'Khi cộng các nhóm đồ vật, ta gộp số lượng lại. Khi trừ, ta lấy bớt đi một phần.',
'Có thể thực hiện phép tính dựa trên hình ảnh rồi chuyển thành phép tính bằng số.',
'Với số tròn chục, ta có thể cộng hoặc trừ theo số chục.',
'Các phép cộng, trừ trong phạm vi 100 không nhớ được thực hiện theo hàng chục và hàng đơn vị.'
],questions:[
['5 + 3 = ?',['6','7','8','9'],2],
['9 − 4 = ?',['4','5','6','7'],1],
['20 + 30 = ?',['40','50','60','70'],1],
['70 − 20 = ?',['40','50','60','90'],1],
['34 + 20 = ?',['44','54','64','74'],1]
]},
{theme:1,title:'Điền phép toán, số',theory:[
'Khi gặp ô trống, trước hết xác định quan hệ giữa các số hoặc hình ảnh.',
'Có thể cần điền dấu +, −, >, <, = hoặc một số còn thiếu.',
'Với bài toán hình ảnh, hãy đếm từng nhóm rồi chọn phép tính phù hợp.'
],questions:[
['Điền số: 6 + ? = 10',['2','3','4','5'],2],
['Điền dấu: 8 … 10',['>','<','=','+'],1],
['Điền số: 9 − ? = 5',['2','3','4','5'],2],
['Điền dấu: 7 … 7',['>','<','=','+'],2],
['Điền số: ? + 3 = 8',['3','4','5','6'],2]
]},
{theme:1,title:'Bài toán que diêm',theory:[
'Bài toán que diêm yêu cầu quan sát cấu tạo của số hoặc hình bằng các que.',
'Một số bài yêu cầu đổi chỗ một que để phép tính đúng; bài khác yêu cầu di chuyển hoặc bỏ que để tạo hình mới.',
'Hãy quan sát cả vị trí và số lượng que trước khi di chuyển.'
],questions:[
['Để tạo số 3 theo cách ghép que diêm, điều quan trọng nhất là gì?',['Đếm số que và vị trí các que','Chọn màu que','Đặt tất cả que nằm ngang','Bỏ hết que'],0],
['Khi đổi chỗ một que để sửa phép tính, bước đầu tiên nên làm gì?',['Di chuyển ngay','Quan sát các chữ số và dấu','Bỏ một que bất kỳ','Đổi màu que'],1],
['Một hình tam giác thường cần ít nhất bao nhiêu cạnh?',['2','3','4','5'],1]
]},
/* CHỦ ĐỀ 2 */
{theme:2,title:'Hình học',theory:[
'Nhận dạng hình là xác định đồ vật hoặc hình vẽ phù hợp với hình cơ bản.',
'Có thể quan sát đặc điểm như cạnh, góc và dạng tổng thể để nhận biết hình.',
'Các bài trong tài liệu sử dụng nhận dạng hình, lắp hình và ghép hình.'
],questions:[
['Hình nào có 3 cạnh?',['Hình tròn','Hình vuông','Hình tam giác','Hình chữ nhật'],2],
['Hình vuông có bao nhiêu góc?',['2','3','4','5'],2],
['Hình nào không có cạnh?',['Tam giác','Hình vuông','Hình tròn','Hình chữ nhật'],2],
['Hình chữ nhật có bao nhiêu cạnh?',['2','3','4','5'],2]
]},
{theme:2,title:'Đếm hình',theory:[
'Khi đếm hình, hãy đánh số hoặc đánh dấu từng hình để tránh đếm trùng.',
'Có thể có hình đơn và hình ghép từ 2, 3, 4 hoặc nhiều hình nhỏ.',
'Quan sát từ hình nhỏ đến hình lớn giúp kiểm tra kết quả.'
],questions:[
['Nếu có 3 hình tam giác riêng biệt thì có bao nhiêu hình tam giác?',['2','3','4','5'],1],
['Một hình được ghép từ 2 hình vuông nhỏ. Có bao nhiêu hình vuông nhỏ?',['1','2','3','4'],1],
['Khi đếm hình ghép, nên làm gì trước?',['Đếm ngẫu nhiên','Đánh dấu từng hình','Bỏ hình nhỏ','Chỉ nhìn hình lớn'],1]
]},
{theme:2,title:'Biểu đồ hình ảnh và cột',theory:[
'Biểu đồ hình ảnh dùng hình hoặc biểu tượng để biểu diễn số lượng.',
'Biểu đồ cột dùng chiều cao của các cột để so sánh số lượng.',
'Khi đọc biểu đồ, hãy xác định từng nhóm và so sánh số lượng của chúng.'
],questions:[
['Một nhóm có 3 biểu tượng, mỗi biểu tượng đại diện 2 đồ vật. Có bao nhiêu đồ vật?',['5','6','7','8'],1],
['Cột cao hơn trong biểu đồ thường biểu thị điều gì?',['Ít hơn','Nhiều hơn','Không có số lượng','Không thể biết'],1],
['Nếu A có 5 đồ vật và B có 3 đồ vật, nhóm nào nhiều hơn?',['A','B','Bằng nhau','Không biết'],0]
]},
{theme:2,title:'Biểu đồ Venn',theory:[
'Biểu đồ Venn dùng các đường cong kín để mô tả mối quan hệ giữa các nhóm.',
'Một đối tượng có thể thuộc một nhóm hoặc đồng thời thuộc hai nhóm nếu thỏa mãn cả hai điều kiện.',
'Tài liệu minh họa việc phân loại con vật, số và rau củ theo màu.'
],questions:[
['Một con vật vừa sống dưới nước vừa sống trên cạn nên được đặt ở đâu?',['Chỉ nhóm dưới nước','Chỉ nhóm trên cạn','Phần giao nhau','Ngoài cả hai nhóm'],2],
['Số 12 là số chẵn và lớn hơn 10. Nó thuộc nhóm nào?',['Chỉ số chẵn','Chỉ lớn hơn 10','Cả hai nhóm','Không nhóm nào'],2],
['Mục đích chính của biểu đồ Venn là gì?',['Tính nhanh','Phân loại và thể hiện quan hệ nhóm','Đo độ dài','Xem giờ'],1]
]},
{theme:2,title:'Bài toán lập bảng',theory:[
'Lập bảng giúp tổ chức thông tin trước khi tính hoặc so sánh.',
'Khi mỗi người có cùng một khoảng thời gian hoặc số lượng, có thể lập bảng để theo dõi từng người.',
'Ví dụ trong tài liệu: mỗi thí sinh trình bày 13 phút; với 4 người cần cộng các khoảng thời gian tương ứng.'
],questions:[
['Mỗi bạn thi 5 phút. 4 bạn cần bao nhiêu phút?',['15','20','25','30'],1],
['Mỗi bạn đọc 3 trang/ngày. 4 ngày đọc được bao nhiêu trang?',['7','10','12','14'],2],
['Nếu mỗi người mất cùng một khoảng thời gian, cách nào giúp theo dõi dễ hơn?',['Lập bảng','Đoán','Bỏ thông tin','Chỉ nhớ người cuối'],0]
]},
/* CHỦ ĐỀ 3 */
{theme:3,title:'So sánh và thay thế',theory:[
'Khi so sánh số, có thể xét hàng chục trước rồi đến hàng đơn vị.',
'Bài toán thay thế dùng một hình hoặc giá trị đã biết để tìm giá trị của hình khác.',
'Với cân hoặc sơ đồ, hãy tìm quan hệ giữa các đại lượng trước khi thay thế.'
],questions:[
['Số nào lớn hơn?',['27','72','27 và 72 bằng nhau','Không biết'],1],
['Điền dấu: 35 … 53',['>','<','=','+'],1],
['Nếu 1 hình tròn = 2 hình vuông thì 3 hình tròn = ? hình vuông',['4','5','6','7'],2],
['16 … 19',['>','<','=','+'],1]
]},
{theme:3,title:'Bài toán đo lường',theory:[
'Có thể so sánh độ dài bằng số đo cùng đơn vị.',
'Ví dụ trong tài liệu: đoạn thẳng CB có độ dài 9 − 3 = 6 cm.',
'Khi sắp xếp độ dài, hãy đưa các số đo về cùng đơn vị rồi so sánh.'
],questions:[
['9 cm − 3 cm = ?',['5 cm','6 cm','7 cm','12 cm'],1],
['Sắp xếp từ bé đến lớn: 7 cm, 4 cm, 6 cm',['4, 6, 7','7, 6, 4','6, 4, 7','4, 7, 6'],0],
['Đoạn A dài 8 cm, đoạn B dài 5 cm. A dài hơn B bao nhiêu?',['2 cm','3 cm','4 cm','13 cm'],1]
]},
{theme:3,title:'Đồng hồ',theory:[
'1 giờ = 60 phút; mặt đồng hồ được chia thành 60 phút.',
'Kim phút bắt đầu ở số 12, tương ứng 0 phút. Mỗi số trên mặt đồng hồ tương ứng 5 phút.',
'Kim giờ cho biết giờ; kim phút cho biết số phút.',
'Ví dụ: kim giờ ở 7 và kim phút ở 12 là 7 giờ; kim phút ở 6 là 30 phút, tức 7 giờ rưỡi.'
],questions:[
['1 giờ có bao nhiêu phút?',['30','45','60','100'],2],
['Kim phút chỉ số 6 tương ứng bao nhiêu phút?',['6','15','30','60'],2],
['Kim giờ ở 7, kim phút ở 12. Đồng hồ chỉ?',['6 giờ','7 giờ','7 giờ 30','12 giờ'],1],
['Kim giờ ở giữa 7 và 8, kim phút ở 6. Đây là?',['7 giờ','7 giờ 15','7 giờ 30','8 giờ'],2]
]},
{theme:3,title:'Bài toán trồng cây',theory:[
'Giữa n cây được trồng liên tiếp có n − 1 khoảng cách.',
'Ví dụ: 4 cây có 3 khoảng cách.',
'Để tìm khoảng cách giữa cây đầu và cây cuối, cần tính số khoảng cách rồi nhân với khoảng cách giữa hai cây liên tiếp.'
],questions:[
['Có 4 cây trồng liên tiếp. Có bao nhiêu khoảng cách?',['2','3','4','5'],1],
['5 cây, mỗi cây cách nhau 2 m. Cây đầu cách cây cuối bao nhiêu?',['6 m','8 m','10 m','12 m'],1],
['8 cây có bao nhiêu khoảng cách giữa các cây?',['6','7','8','9'],1]
]},
{theme:3,title:'Bài toán xếp hàng',theory:[
'Khi biết số người đứng trước và sau một bạn, tổng số người = trước + bạn đó + sau.',
'Có thể đổi vị trí từ đầu hàng sang cuối hàng bằng cách đếm tổng số người.',
'Ví dụ trong tài liệu: trước Min có 6 bạn, sau Min có 3 bạn nên cả hàng có 10 bạn.'
],questions:[
['Trước Min có 6 bạn, sau Min có 3 bạn. Cả hàng có bao nhiêu bạn?',['9','10','11','12'],1],
['Có 3 người đứng trước Nga và Nga đứng thứ 4 từ đầu. Có bao nhiêu người trước Nga?',['2','3','4','5'],1],
['Một hàng có 20 bạn. Nam đứng thứ 6 từ dưới lên. Nam đứng thứ mấy từ trên xuống?',['14','15','16','17'],2]
]},
/* CHỦ ĐỀ 4 */
{theme:4,title:'Quy luật tăng giảm',theory:[
'Quan sát dãy hình hoặc số để tìm quy luật thay đổi.',
'Quy luật có thể tăng dần hoặc giảm dần.',
'Sau khi xác định quy luật, áp dụng quy luật đó để tìm phần còn thiếu.'
],questions:[
['Dãy số 2, 4, 6, 8, ? tăng mỗi lần bao nhiêu?',['1','2','3','4'],1],
['Số tiếp theo của 10, 8, 6, 4 là?',['1','2','3','5'],1],
['Dãy 1, 3, 5, 7, ? là số nào?',['8','9','10','11'],1]
]},
{theme:4,title:'Quy luật hình dạng, màu sắc',theory:[
'Có thể tìm quy luật dựa vào hình dạng hoặc màu sắc.',
'Ví dụ một dãy có thể lặp lại đỏ – xanh – đỏ – xanh.',
'Hãy tìm đơn vị lặp nhỏ nhất trước khi chọn hình tiếp theo.'
],questions:[
['🔴 🔵 🔴 🔵 ?',['🔴','🔵','🟢','🟡'],0],
['Nếu dãy lặp lại ⭐ ⚪ ⭐ ⚪ thì hình tiếp theo là?',['⭐','⚪','🔺','🔵'],0],
['Quy luật màu sắc cần quan sát yếu tố nào?',['Màu','Chỉ kích thước','Chỉ số lượng','Thời gian'],0]
]},
{theme:4,title:'Quy luật kích thước',theory:[
'Quy luật có thể được tạo bởi kích thước lớn – nhỏ.',
'Quan sát thứ tự kích thước và tìm cách thay đổi lặp lại.',
'Khi đã xác định quy luật, suy ra kích thước của hình còn thiếu.'
],questions:[
['Một dãy có kích thước: nhỏ, vừa, lớn, nhỏ, vừa, … hình tiếp theo là?',['Nhỏ','Vừa','Lớn','Không biết'],2],
['Nếu hình liên tục tăng kích thước thì hình tiếp theo thường phải?',['Nhỏ hơn','Lớn hơn','Đổi màu','Biến mất'],1],
['Khi tìm quy luật kích thước, yếu tố chính cần quan sát là?',['Kích thước','Tên gọi','Màu chữ','Số trang'],0]
]},
{theme:4,title:'Bài toán hình vẽ có quy luật',theory:[
'Phương pháp: tìm quy luật của dãy hình, sau đó dùng quy luật để suy ra hình cần tìm.',
'Tài liệu có ví dụ các ngôi sao xen kẽ với các hình tròn; số hình tròn giữa hai ngôi sao tăng dần 1, 2, 3…',
'Không chỉ nhìn từng hình riêng lẻ; hãy xem quan hệ giữa các vị trí.'
],questions:[
['Nếu số hình tròn giữa các ngôi sao lần lượt là 1, 2, 3 thì tiếp theo là?',['1','2','3','4'],3],
['Bước đầu tiên khi gặp dãy hình thiếu một hình là gì?',['Đoán ngay','Tìm quy luật','Bỏ câu hỏi','Đếm trang'],1],
['Một dãy hình xen kẽ A-B-A-B-… thì sau B thường là?',['A','B','C','Không biết'],0]
]},
/* CHỦ ĐỀ 5 */
{theme:5,title:'Các số trong phạm vi 10',theory:[
'Các số trong phạm vi 10 được tài liệu nêu là 0 đến 10.',
'Có thể biểu diễn số bằng hình ảnh, đồ vật hoặc chữ số.',
'Quan sát số lượng rồi chọn chữ số tương ứng.'
],questions:[
['Số nào thuộc phạm vi 10?',['9','12','15','20'],0],
['Số lớn nhất trong các số 0 đến 10 là?',['8','9','10','11'],2],
['Số nào đứng giữa 6 và 8?',['5','6','7','9'],2]
]},
{theme:5,title:'Tách – gộp và so sánh',theory:[
'Một số có thể được tách thành hai phần rồi gộp lại thành số ban đầu.',
'Tài liệu sử dụng sơ đồ tách – gộp để biểu diễn cấu tạo số.',
'Các số từ 0 đến 10 được sắp xếp: 0 < 1 < 2 < … < 10.'
],questions:[
['8 có thể tách thành 3 và số nào?',['4','5','6','7'],1],
['5 + 2 tạo thành số nào?',['6','7','8','9'],1],
['Điền dấu: 7 … 9',['>','<','=','+'],1]
]},
{theme:5,title:'Cộng, trừ trong phạm vi 10',theory:[
'Có thể tính nhanh bằng hình ảnh hoặc số.',
'Với nhiều phép tính liên tiếp, thực hiện lần lượt từ trái qua phải.',
'Kết hợp cộng và trừ với tình huống thêm hoặc bớt.'
],questions:[
['3 + 4 = ?',['6','7','8','9'],1],
['8 − 5 = ?',['2','3','4','5'],1],
['2 + 3 + 4 = ?',['8','9','10','11'],1],
['8 − 4 − 2 = ?',['1','2','3','4'],1]
]},
{theme:5,title:'Bài toán thêm bớt đơn vị',theory:[
'Toán thêm thường dùng phép cộng.',
'Toán bớt thường dùng phép trừ.',
'Hãy xác định số ban đầu, số thêm hoặc số bớt trước khi tính.'
],questions:[
['Có 5 quả táo, thêm 2 quả. Có tất cả?',['6','7','8','9'],1],
['Có 9 quả táo, bớt 3 quả. Còn lại?',['5','6','7','8'],1],
['Có 6 con chim, thêm 3 con. Có tất cả?',['8','9','10','11'],1]
]},
/* CHỦ ĐỀ 6 */
{theme:6,title:'Vị trí và khối hình',theory:[
'Các vị trí cơ bản: trái – phải; trước – sau; trên – dưới; ở giữa.',
'Tài liệu giới thiệu khối lập phương và khối hộp chữ nhật.',
'Hãy quan sát vị trí của đồ vật theo đúng hướng được hỏi.'
],questions:[
['Nếu quả bóng ở trước con mèo thì con mèo ở đâu so với quả bóng?',['Trước','Sau','Trên','Dưới'],1],
['Tủ lạnh thường gần với khối nào?',['Khối hộp chữ nhật','Khối cầu','Khối nón','Khối trụ'],0],
['Từ nào mô tả vị trí?',['Trái','Xanh','Tròn','Dài'],0]
]},
{theme:6,title:'Các hình cơ bản',theory:[
'Các hình cơ bản trong tài liệu: hình vuông, hình tròn, hình chữ nhật, hình tam giác.',
'Nhận biết hình dựa vào đặc điểm hình học và hình dạng của đồ vật.'
],questions:[
['Hình nào có dạng tròn?',['⚪','🔺','⬜','▭'],0],
['Hình nào có 3 cạnh?',['Hình tròn','Hình tam giác','Hình vuông','Hình chữ nhật'],1],
['Hình nào có 4 cạnh bằng nhau?',['Hình tròn','Tam giác','Hình vuông','Không hình nào'],2]
]},
{theme:6,title:'Đếm hình',theory:[
'Đánh số các hình bên trong trước khi đếm.',
'Đếm từ hình đơn đến các hình ghép từ nhiều hình nhỏ.',
'Kiểm tra lại bằng cách đếm theo từng loại hình.'
],questions:[
['Có 4 hình tròn riêng biệt. Có bao nhiêu hình tròn?',['2','3','4','5'],2],
['Một hình gồm 5 hình tam giác nhỏ. Có bao nhiêu tam giác nhỏ?',['3','4','5','6'],2],
['Cách nào giúp tránh đếm trùng?',['Đánh dấu từng hình','Đếm thật nhanh','Bỏ hình nhỏ','Không cần kiểm tra'],0]
]},
/* CHỦ ĐỀ 7 */
{theme:7,title:'Số và cộng trừ trong phạm vi 20',theory:[
'Tài liệu giới thiệu các số trong phạm vi 20 và phép cộng, phép trừ trong phạm vi 20.',
'Có thể dùng cấu tạo số và hình ảnh để hỗ trợ tính toán.',
'Khi so sánh hai số, có thể xét số chục trước rồi số đơn vị.'
],questions:[
['7 + 5 = ?',['11','12','13','14'],1],
['15 − 6 = ?',['7','8','9','10'],2],
['Số lớn hơn 18 và bé hơn 20 là?',['17','18','19','20'],2],
['Phép tính nào có kết quả 15?',['7+7','8+7','9+7','10+7'],1]
]},
{theme:7,title:'Đồng hồ',theory:[
'Mặt đồng hồ có kim giờ và kim phút.',
'Kim phút ở 12 là 0 phút; ở 6 là 30 phút.',
'Đồng hồ điện tử hiển thị giờ ở bên trái và phút ở bên phải, ngăn cách bằng dấu hai chấm.',
'24 giờ tạo thành một ngày.'
],questions:[
['Kim giờ 11, kim phút 12 là mấy giờ?',['10:00','11:00','11:30','12:00'],1],
['Kim giờ 8, kim phút 6 là?',['8:00','8:15','8:30','9:00'],2],
['11:00 trên đồng hồ điện tử có nghĩa là?',['11 giờ','1 giờ','11 phút','1 phút'],0]
]},
{theme:7,title:'Bài toán so sánh',theory:[
'Khi hai số có cùng số chục, so sánh chữ số hàng đơn vị.',
'Tài liệu có ví dụ so sánh 20 và 26: cả hai có 2 chục nên xét hàng đơn vị.',
'Điền số vào điều kiện bằng cách tìm các giá trị thỏa mãn bất đẳng thức.'
],questions:[
['Số nào lớn hơn 20 và bé hơn 27?',['19','20','23','30'],2],
['Điền dấu: 18 … 15',['>','<','=','+'],0],
['Nếu 20 và 26 đều có 2 chục, cần so sánh tiếp gì?',['Hàng đơn vị','Màu sắc','Số trang','Đơn vị đo'],0]
]},
{theme:7,title:'Tìm quy luật',theory:[
'Có thể tìm quy luật bằng cách so sánh khoảng cách giữa các số.',
'Ví dụ trong tài liệu: 2, 5, 8, 11, 14 tăng thêm 3 mỗi bước.',
'Sau khi tìm được bước tăng hoặc giảm, áp dụng cho các ô còn thiếu.'
],questions:[
['2, 5, 8, 11, ?',['12','13','14','15'],2],
['5, 8, 11, 14 tăng mỗi lần bao nhiêu?',['2','3','4','5'],1],
['0, 2, 2, 4, … có thể tiếp tục theo quy luật cộng 2, giữ nguyên, cộng 2… số tiếp theo là?',['4','5','6','7'],0]
]},
/* CHỦ ĐỀ 8 */
{theme:8,title:'Chục và số tròn chục',theory:[
'Số tròn chục là số có hàng đơn vị bằng 0.',
'Các số tròn chục hai chữ số gồm 10, 20, 30, …, 90.',
'Có thể cộng, trừ số tròn chục bằng cách cộng hoặc trừ số chục.'
],questions:[
['Số nào là số tròn chục?',['23','35','40','47'],2],
['30 + 20 = ?',['40','50','60','70'],1],
['70 − 30 = ?',['30','40','50','60'],1],
['Hàng đơn vị của số tròn chục là?',['0','1','5','9'],0]
]},
{theme:8,title:'Số đến 40 và so sánh',theory:[
'Với số có hai chữ số, chữ số bên trái biểu thị số chục và bên phải biểu thị số đơn vị.',
'Khi hai số có cùng số chục, so sánh hàng đơn vị.',
'Có thể biểu diễn số bằng chục và đơn vị để dễ so sánh.'
],questions:[
['47 gồm bao nhiêu chục và đơn vị?',['4 chục 7 đơn vị','7 chục 4 đơn vị','4 chục 4 đơn vị','7 chục 7 đơn vị'],0],
['35 … 38',['>','<','=','+'],1],
['Số nào lớn hơn 29 nhưng bé hơn 40?',['28','30','41','50'],1]
]},
{theme:8,title:'Các số đến 100 và cộng trừ không nhớ',theory:[
'Số có hai chữ số gồm hàng chục và hàng đơn vị.',
'Phép cộng, trừ không nhớ có thể thực hiện theo từng hàng.',
'Khi tính với số tròn chục, có thể thao tác trực tiếp trên hàng chục.'
],questions:[
['34 + 20 = ?',['44','54','64','74'],1],
['68 − 30 = ?',['28','38','48','58'],1],
['60 − 10 + 30 = ?',['70','80','90','100'],1],
['10 + 10 + 10 = ?',['20','30','40','50'],1]
]},
{theme:8,title:'Lịch và các ngày trong tuần',theory:[
'Một tuần có 7 ngày: thứ hai, thứ ba, thứ tư, thứ năm, thứ sáu, thứ bảy và chủ nhật.',
'Khi dịch một tuần, ngày trong tuần giữ nguyên nhưng ngày trong tháng thay đổi 7 đơn vị.',
'Có thể dùng phép cộng hoặc trừ 7 để tìm ngày tương ứng của tuần trước hoặc tuần sau.'
],questions:[
['Một tuần có bao nhiêu ngày?',['5','6','7','8'],2],
['Hôm nay là thứ Bảy. Hôm kia là thứ mấy?',['Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Năm?'],2],
['Sau thứ Sáu là?',['Thứ Năm','Thứ Bảy','Chủ nhật','Thứ Hai'],1]
]},
{theme:8,title:'Độ dài và đơn vị đo',theory:[
'Độ dài có thể được biểu diễn bằng đơn vị như cm.',
'Khi so sánh độ dài, dùng cùng đơn vị đo.',
'Có thể tính tổng hoặc phần còn lại bằng phép cộng, trừ độ dài.'
],questions:[
['24 cm cắt đi 8 cm còn lại?',['14 cm','16 cm','18 cm','20 cm'],1],
['4 cm < 6 cm < 7 cm. Độ dài lớn nhất là?',['4 cm','6 cm','7 cm','17 cm'],2],
['Một đoạn 9 cm, đoạn khác 3 cm. Hiệu độ dài là?',['5 cm','6 cm','7 cm','12 cm'],1]
]}
];
