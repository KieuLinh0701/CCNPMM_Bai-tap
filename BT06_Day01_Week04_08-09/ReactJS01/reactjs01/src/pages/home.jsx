import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Empty, Button, Space, Typography, Pagination, Input, Slider, Select } from 'antd';
import { searchProductsApi, getCategoriesApi } from '../util/api';

const { Meta } = Card;
const { Title } = Typography;
const { Option } = Select;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortByViews, setSortByViews] = useState("desc");

  const pageSize = 3;

  // Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesApi();
        console.log("Danh mục sau khi parse:", data);

        if (Array.isArray(data)) {
          setCategories(["All", ...data]); 
        } else {
          console.error("API categories không trả về mảng:", data);
          setCategories(["All"]);
        }
      } catch (err) {
        console.error("Lỗi lấy danh mục:", err);
      }
    };

    fetchCategories();
  }, []);

  // Lấy sản phẩm với filter + search
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        category: selectedCategory === "All" ? null : selectedCategory,
        search: searchText || null,
        priceMin: priceRange[0],
        priceMax: priceRange[1],
        sortViews: sortByViews,
        page,
        limit: pageSize,
      };
      const res = await searchProductsApi(params);
      setProducts(res?.data || []);
      setTotalProducts(res?.total || 0);
    } catch (err) {
      console.error("Lỗi lấy sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1);
  }, [selectedCategory, searchText, priceRange, sortByViews]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Danh Mục Sản Phẩm</Title>

      <Space style={{ marginBottom: 20, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <Button
            key={cat}
            type={selectedCategory === cat ? "primary" : "default"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}

        <Input.Search
          placeholder="Tìm kiếm sản phẩm..."
          allowClear
          onSearch={value => setSearchText(value)}
          style={{ width: 200 }}
        />

        <div style={{ width: 200 }}>
          <span>Giá: {priceRange[0]} - {priceRange[1]}</span>
          <Slider
            range
            min={0}
            max={50}
            value={priceRange}
            onChange={setPriceRange}
          />
        </div>

        <Select
          placeholder="Sắp xếp lượt xem"
          style={{ width: 180 }}
          allowClear
          value={sortByViews}
          onChange={setSortByViews}
        >
          <Option value="asc">Tăng dần</Option>
          <Option value="desc">Giảm dần</Option>
        </Select>

        {/* Nút bỏ lọc */}
        <Button
          danger
          onClick={() => {
            setSelectedCategory("All");
            setSearchText("");
            setPriceRange([0, 50]);
            setSortByViews(null);
            value={sortByViews}
          }}
        >
          Bỏ lọc
        </Button>
      </Space>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <Spin size="large" tip="Đang tải sản phẩm..." />
        </div>
      ) : products.length === 0 ? (
        <Empty description="Không có sản phẩm" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {products.map(item => (
              <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  cover={
                    <img
                      alt={item.name}
                      src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                      style={{ objectFit: 'cover', height: 200 }}
                    />
                  }
                >
                  <Meta title={item.name} description={`Giá: $${item.price}`} />
                  <div>Lượt xem: {item.views || 0}</div>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalProducts}
            onChange={page => setCurrentPage(page)}
            style={{ textAlign: 'center', marginTop: 20 }}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;