import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import { uploadToCloudinary } from '../utils/cloudinary';
import { 
  faceShapes, beardTypes, volumeOptions, hairTypes, hairfallTypes, lengthOptions,
  occasionOptions, clothingSections, seasonOptions, skinToneOptions, 
  heightOptions, bodyComplexityOptions, groomingSections, timeOptions, platformOptions,
  bodyTypeOptions, wristSizeOptions
} from '../data/formOptions';

import Navbar from './layout/Navbar';
import ProfilePopup from './layout/ProfilePopup';
import InfoButton from './layout/InfoButton';
import Footer from './layout/Footer';
import bgVideo from '../assets/grooming.mp4';

const MultiSelect = ({ label, options, selected, onChange, required }) => {
  const toggle = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="multiselect-wrapper">
      <label className="upload-label">
        {label} {required && '*'}
      </label>
      <div className="multiselect-chips">
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            className={`multiselect-chip ${selected.includes(opt.value) ? 'selected' : ''}`}
            onClick={() => toggle(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const NewUpload = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const [imageTab, setImageTab] = useState('file');
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [publishing, setPublishing] = useState(false);

  const [formData, setFormData] = useState({ 
    title: '', 
    description: '',
    youtubeLink: '' 
  });

  const [category, setCategory] = useState('');

  const [occasions, setOccasions] = useState([]);
  const [groomingSection, setGroomingSection] = useState('');
  const [faceShapesSelected, setFaceShapesSelected] = useState([]);
  const [beardTypesSelected, setBeardTypesSelected] = useState([]);
  const [volumeSelected, setVolumeSelected] = useState([]);
  const [hairTypesSelected, setHairTypesSelected] = useState([]);
  const [hairfallSelected, setHairfallSelected] = useState([]);
  const [lengthSelected, setLengthSelected] = useState([]);
  const [timeSelected, setTimeSelected] = useState([]);

  const [clothingSection, setClothingSection] = useState('');
  const [occasionsClothing, setOccasionsClothing] = useState([]);
  const [seasonsSelected, setSeasonsSelected] = useState([]);
  const [skinTonesSelected, setSkinTonesSelected] = useState([]);
  const [heightsSelected, setHeightsSelected] = useState([]);
  const [bodyComplexitySelected, setBodyComplexitySelected] = useState([]);
  const [wristSizeSelected, setWristSizeSelected] = useState([]);
  const [bodyTypeSelected, setBodyTypeSelected] = useState([]);

  const [platformLinks, setPlatformLinks] = useState([
    { platform: '', link: '', price: '' }
  ]);

  const [productItems, setProductItems] = useState([
    { imageFile: null, imageUrl: '', imagePreview: null, affiliateLink: '', useUrl: false }
  ]);

  useEffect(() => {
    setGroomingSection('');
    setClothingSection('');
    setOccasions([]);
    setOccasionsClothing([]);
  }, [category]);

  const computeResultKeys = () => {
    if (category === 'Grooming') {
      const keys = [];
      const section = groomingSection;
      
      if (section === 'beard') {
        faceShapesSelected.forEach(face => {
          beardTypesSelected.forEach(beard => {
            volumeSelected.forEach(vol => {
              keys.push(`${face}_${beard}_${vol}`);
            });
          });
        });
      } else if (section === 'hair') {
        hairTypesSelected.forEach(hair => {
          lengthSelected.forEach(len => {
            hairfallSelected.forEach(fall => {
              keys.push(`${hair}_${len}_${fall}`);
            });
          });
        });
      }
      return keys;
    }
  
    if (category === 'Clothing') {
      const keys = [];
      const section = clothingSection;
      
      if (section === 'accessories' || section === 'fragrance') {
        occasionsClothing.forEach(occ => {
          seasonsSelected.forEach(season => {
            timeSelected.forEach(time => {
              keys.push(`clothing_${occ}_${section}_${season}_${time}`);
            });
          });
        });
      } else if (section === 'watches') {
        occasionsClothing.forEach(occ => {
          seasonsSelected.forEach(season => {
            wristSizeSelected.forEach(wrist => {
              timeSelected.forEach(time => {
                keys.push(`clothing_${occ}_watches_${season}_${wrist}_${time}`);
              });
            });
          });
        });
      } else if (section === 'footwears') {
        occasionsClothing.forEach(occ => {
          seasonsSelected.forEach(season => {
            timeSelected.forEach(time => {
              keys.push(`clothing_${occ}_footwears_${season}_${time}`);
            });
          });
        });
      } else if (section === 'dresses') {
        occasionsClothing.forEach(occ => {
          skinTonesSelected.forEach(skin => {
            heightsSelected.forEach(height => {
              bodyComplexitySelected.forEach(body => {
                bodyTypeSelected.forEach(btype => {
                  seasonsSelected.forEach(season => {
                    timeSelected.forEach(time => {
                      keys.push(`clothing_${occ}_dresses_${skin}_${height}_${body}_${btype}_${season}_${time}`);
                    });
                  });
                });
              });
            });
          });
        });
      }
      return keys;
    }
    return [];
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const addProductItem = () => {
    if (productItems.length >= 10) return;
    setProductItems([...productItems, { imageFile: null, imageUrl: '', imagePreview: null, affiliateLink: '', useUrl: false }]);
  };

  const removeProductItem = (index) => {
    setProductItems(productItems.filter((_, i) => i !== index));
  };

  const handleProductFileSelect = (e, index) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newItems = [...productItems];
      newItems[index].imageFile = file;
      newItems[index].imagePreview = URL.createObjectURL(file);
      setProductItems(newItems);
    }
  };

  const addPlatformLink = () => {
    if (platformLinks.length >= 5) return;
    setPlatformLinks([...platformLinks, { platform: '', link: '', price: '' }]);
  };
  
  const removePlatformLink = (index) => {
    setPlatformLinks(platformLinks.filter((_, i) => i !== index));
  };
  
  const updatePlatformLink = (index, field, value) => {
    const updated = [...platformLinks];
    updated[index][field] = value;
    setPlatformLinks(updated);
  };

  const handlePublish = async () => {
    // Validate based on category
    if (!mainImagePreview || !formData.title || !category) {
      alert('Please fill all required fields');
      return;
    }
  
    if (category === 'Grooming') {
      if (occasions.length === 0 || !groomingSection || timeSelected.length === 0) {
        alert('Please fill all required grooming fields');
        return;
      }
      if (groomingSection === 'beard' && (faceShapesSelected.length === 0 || beardTypesSelected.length === 0 || volumeSelected.length === 0)) {
        alert('Please fill all beard fields');
        return;
      }
      if (groomingSection === 'hair' && (hairTypesSelected.length === 0 || hairfallSelected.length === 0 || lengthSelected.length === 0)) {
        alert('Please fill all hair fields');
        return;
      }
    }
  
    if (category === 'Clothing') {
      if (occasionsClothing.length === 0 || !clothingSection || timeSelected.length === 0) {
        alert('Please fill all required clothing fields');
        return;
      }
    }
  
    setPublishing(true);
  
    try {
      // Upload main image
      let finalMainImageUrl = mainImageUrl;
      if (imageTab === 'file' && mainImageFile) {
        finalMainImageUrl = await uploadToCloudinary(mainImageFile);
      }
  
      // Upload product/related product images
      const finalProducts = await Promise.all(
        productItems.map(async (item) => {
          let imgUrl = item.imageUrl;
          if (!item.useUrl && item.imageFile) {
            imgUrl = await uploadToCloudinary(item.imageFile);
          }
          return { 
            imageUrl: imgUrl, 
            affiliateLink: item.affiliateLink 
          };
        })
      );
  
      // Compute result keys
      const resultKeys = computeResultKeys();
  
      // Build upload data based on category
      let uploadData = {
        creatorId: user.uid,
        title: formData.title,
        description: formData.description,
        mainImage: finalMainImageUrl,
        category: category.toLowerCase(),
        timeOfDay: timeSelected,
        resultKeys: resultKeys,
        analytics: { views: 0, likes: 0, productClicks: {} },
        createdAt: serverTimestamp()
      };
  
      if (category === 'Grooming') {
        uploadData = {
          ...uploadData,
          type: 'grooming',
          youtubeLink: formData.youtubeLink,
          occasions: occasions,
          section: groomingSection,
          // Beard specific
          ...(groomingSection === 'beard' && {
            faceShapes: faceShapesSelected,
            beardTypes: beardTypesSelected,
            volume: volumeSelected,
          }),
          // Hair specific
          ...(groomingSection === 'hair' && {
            hairTypes: hairTypesSelected,
            hairfallTypes: hairfallSelected,
            length: lengthSelected,
          }),
          products: finalProducts.filter(p => p.imageUrl),
        };
      }
  
      if (category === 'Clothing') {
        uploadData = {
          ...uploadData,
          type: 'clothing',
          occasions: occasionsClothing,
          section: clothingSection,
          platforms: platformLinks.filter(p => p.link),
          relatedProducts: finalProducts.filter(p => p.imageUrl),
          // Section specific
          ...(clothingSection !== 'dresses' && {
            seasons: seasonsSelected,
          }),
          ...(clothingSection === 'dresses' && {
            skinTones: skinTonesSelected,
            heights: heightsSelected,
            bodyComplexity: bodyComplexitySelected,
            bodyType: bodyTypeSelected,
            seasons: seasonsSelected,
          }),
          ...(clothingSection === 'watches' && {
            wristSize: wristSizeSelected,
          }),
        };
      }
  
      await addDoc(collection(db, 'uploads'), uploadData);
      navigate(`/business/${user.uid}`);
  
    } catch (error) {
      console.error('Publish error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="new-upload-page">
      <div className="new-upload-header">
        <video autoPlay loop muted playsInline src={bgVideo} />
        <Navbar />
        <ProfilePopup />
        <InfoButton onClick={() => {}} />
        <h2 className="new-upload-heading">NEW UPLOAD</h2>
      </div>

      <div className="new-upload-content">
        <div className="upload-left">
          <div className="image-tab-switcher">
            <button className={`image-tab-btn ${imageTab === 'file' ? 'active' : ''}`} onClick={() => setImageTab('file')}>
              📁 Upload File
            </button>
            <button className={`image-tab-btn ${imageTab === 'url' ? 'active' : ''}`} onClick={() => setImageTab('url')}>
              🔗 Paste URL
            </button>
          </div>

          {imageTab === 'file' ? (
            <>
              <div 
                className="upload-dropzone" 
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {mainImagePreview ? (
                  <img src={mainImagePreview} className="upload-preview" alt="Preview" />
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">↑</span>
                    <p>Choose a file or drag and drop it here</p>
                    <p className="upload-hint">Recommended: high quality .jpg less than 20MB</p>
                  </div>
                )}
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*"
                style={{display: 'none'}}
                onChange={handleFileSelect}
              />
            </>
          ) : (
            <>
              <input 
                type="text"
                placeholder="Paste image URL here..."
                className="url-input"
                value={mainImageUrl}
                onChange={(e) => {
                  setMainImageUrl(e.target.value);
                  setMainImagePreview(e.target.value);
                }}
              />
              {mainImagePreview && (
                <img 
                  src={mainImagePreview} 
                  className="upload-preview"
                  alt="Preview URL"
                  onError={() => setMainImagePreview(null)} 
                />
              )}
            </>
          )}
        </div>

        <div className="upload-right">
          {/* Title - always shown */}
          <input type="text" placeholder="Add a title *"
            className="upload-input" value={formData.title}
            onChange={(e) => setFormData({
              ...formData, title: e.target.value
            })} />

          {/* Description - always shown */}
          <textarea placeholder="Add a detailed description"
            className="upload-textarea"
            value={formData.description} rows={4}
            onChange={(e) => setFormData({
              ...formData, description: e.target.value
            })} />

          {/* YouTube link - GROOMING only */}
          {category === 'Grooming' && (
            <input type="text" 
              placeholder="Add a YouTube link (optional)"
              className="upload-input"
              value={formData.youtubeLink}
              onChange={(e) => setFormData({
                ...formData, youtubeLink: e.target.value
              })} />
          )}

          {/* Platform links - CLOTHING only */}
          {category === 'Clothing' && (
            <div className="platform-links-section">
              <label className="upload-label">
                Platform Links
              </label>
              {platformLinks.map((item, index) => (
                <div key={index} className="platform-link-item">
                  <select className="upload-select platform-select"
                    value={item.platform}
                    onChange={(e) => updatePlatformLink(
                      index, 'platform', e.target.value
                    )}>
                    <option value="" disabled>
                      Select Platform
                    </option>
                    {platformOptions.map(p => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <input type="text"
                    placeholder="Affiliate link"
                    className="upload-input"
                    value={item.link}
                    onChange={(e) => updatePlatformLink(
                      index, 'link', e.target.value
                    )} />
                  <input type="number"
                    placeholder="Price (₹)"
                    className="upload-input"
                    value={item.price}
                    onChange={(e) => updatePlatformLink(
                      index, 'price', e.target.value
                    )} />
                  {platformLinks.length > 1 && (
                    <button className="remove-product-btn"
                      onClick={() => removePlatformLink(index)}>
                      ×
                    </button>
                  )}
                </div>
              ))}
              {platformLinks.length < 5 && (
                <button className="add-more-btn"
                  onClick={addPlatformLink}>
                  + Add Platform
                </button>
              )}
            </div>
          )}

          {/* Related/Tag Products */}
          <div className="products-section">
            <label className="upload-label">
              {category === 'Clothing' 
                ? 'Related Products' 
                : 'Tag Products'}
            </label>
            {productItems.map((item, index) => (
              <div key={index} className="product-item">
                <div className="product-item-header">
                  <span className="product-item-title">Product {index + 1}</span>
                  {productItems.length > 1 && (
                    <button className="remove-product-btn" onClick={() => removeProductItem(index)}>×</button>
                  )}
                </div>
                
                <div className="image-tab-switcher">
                  <button className={`image-tab-btn ${!item.useUrl ? 'active' : ''}`} onClick={() => {
                    const newItems = [...productItems];
                    newItems[index].useUrl = false;
                    setProductItems(newItems);
                  }}>
                    📁 Upload
                  </button>
                  <button className={`image-tab-btn ${item.useUrl ? 'active' : ''}`} onClick={() => {
                    const newItems = [...productItems];
                    newItems[index].useUrl = true;
                    setProductItems(newItems);
                  }}>
                    🔗 URL
                  </button>
                </div>

                {!item.useUrl ? (
                  <>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="upload-input"
                      style={{padding: '10px'}}
                      onChange={(e) => handleProductFileSelect(e, index)}
                    />
                    {item.imagePreview && <img src={item.imagePreview} className="product-image-preview" alt="Product Preview" />}
                  </>
                ) : (
                  <>
                    <input 
                      type="text"
                      placeholder="Product image URL"
                      className="url-input"
                      value={item.imageUrl}
                      onChange={(e) => {
                        const newItems = [...productItems];
                        newItems[index].imageUrl = e.target.value;
                        newItems[index].imagePreview = e.target.value;
                        setProductItems(newItems);
                      }}
                    />
                    {item.imagePreview && (
                      <img 
                        src={item.imagePreview} 
                        className="product-image-preview" 
                        alt="Product URL Preview"
                        onError={() => {
                          const newItems = [...productItems];
                          newItems[index].imagePreview = null;
                          setProductItems(newItems);
                        }} 
                      />
                    )}
                  </>
                )}
                
                <input
                  type="text"
                  placeholder="Affiliate Link"
                  className="upload-input"
                  value={item.affiliateLink}
                  onChange={(e) => {
                    const newItems = [...productItems];
                    newItems[index].affiliateLink = e.target.value;
                    setProductItems(newItems);
                  }}
                  style={{marginBottom: '0', marginTop: '10px'}}
                />
              </div>
            ))}
            
            {productItems.length < 10 && (
              <button className="add-more-btn" onClick={addProductItem}>
                + Add More
              </button>
            )}
          </div>

          {/* Category - always shown */}
          <label className="upload-label">
            Belongs to which category *
          </label>
          <select className="upload-select" value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled>Select category</option>
            <option value="Grooming">Grooming</option>
            <option value="Clothing">Clothing</option>
          </select>

          {/* ===== GROOMING FIELDS ===== */}
          {category === 'Grooming' && (
            <>
              <MultiSelect
                label="Occasion"
                options={occasionOptions}
                selected={occasions}
                onChange={setOccasions}
                required
              />

              <label className="upload-label">Section *</label>
              <select className="upload-select"
                value={groomingSection}
                onChange={(e) => setGroomingSection(e.target.value)}>
                <option value="" disabled>Select section</option>
                <option value="beard">Beard</option>
                <option value="hair">Hair</option>
              </select>

              {/* BEARD fields */}
              {groomingSection === 'beard' && (
                <>
                  <MultiSelect
                    label="Face Shape"
                    options={faceShapes}
                    selected={faceShapesSelected}
                    onChange={setFaceShapesSelected}
                    required
                  />
                  <MultiSelect
                    label="Beard Type"
                    options={beardTypes}
                    selected={beardTypesSelected}
                    onChange={setBeardTypesSelected}
                    required
                  />
                  <MultiSelect
                    label="Volume"
                    options={volumeOptions}
                    selected={volumeSelected}
                    onChange={setVolumeSelected}
                    required
                  />
                </>
              )}

              {/* HAIR fields */}
              {groomingSection === 'hair' && (
                <>
                  <MultiSelect
                    label="Hair Type"
                    options={hairTypes}
                    selected={hairTypesSelected}
                    onChange={setHairTypesSelected}
                    required
                  />
                  <MultiSelect
                    label="Hairfall Type"
                    options={hairfallTypes}
                    selected={hairfallSelected}
                    onChange={setHairfallSelected}
                    required
                  />
                  <MultiSelect
                    label="Length"
                    options={lengthOptions}
                    selected={lengthSelected}
                    onChange={setLengthSelected}
                    required
                  />
                </>
              )}
            </>
          )}

          {/* ===== CLOTHING FIELDS ===== */}
          {category === 'Clothing' && (
            <>
              <MultiSelect
                label="Occasion"
                options={occasionOptions}
                selected={occasionsClothing}
                onChange={setOccasionsClothing}
                required
              />

              <label className="upload-label">Section *</label>
              <select className="upload-select"
                value={clothingSection}
                onChange={(e) => setClothingSection(e.target.value)}>
                <option value="" disabled>Select section</option>
                <option value="accessories">Accessories</option>
                <option value="fragrance">Fragrance</option>
                <option value="dresses">Dresses</option>
                <option value="watches">Watches</option>
                <option value="footwears">Footwears</option>
              </select>

              {/* Accessories / Fragrance fields */}
              {(clothingSection === 'accessories' || 
                clothingSection === 'fragrance') && (
                <MultiSelect
                  label="Season"
                  options={seasonOptions}
                  selected={seasonsSelected}
                  onChange={setSeasonsSelected}
                  required
                />
              )}

              {/* Dresses fields */}
              {clothingSection === 'dresses' && (
                <>
                  <MultiSelect
                    label="Skin Tone"
                    options={skinToneOptions}
                    selected={skinTonesSelected}
                    onChange={setSkinTonesSelected}
                    required
                  />
                  <MultiSelect
                    label="Height"
                    options={heightOptions}
                    selected={heightsSelected}
                    onChange={setHeightsSelected}
                    required
                  />
                  <MultiSelect
                    label="Body Complexity"
                    options={bodyComplexityOptions}
                    selected={bodyComplexitySelected}
                    onChange={setBodyComplexitySelected}
                    required
                  />
                  <MultiSelect
                    label="Season"
                    options={seasonOptions}
                    selected={seasonsSelected}
                    onChange={setSeasonsSelected}
                    required
                  />
                  <MultiSelect
                    label="Body Type"
                    options={bodyTypeOptions}
                    selected={bodyTypeSelected}
                    onChange={setBodyTypeSelected}
                    required
                  />
                </>
              )}

              {/* Watches fields */}
              {clothingSection === 'watches' && (
                <>
                  <MultiSelect
                    label="Season"
                    options={seasonOptions}
                    selected={seasonsSelected}
                    onChange={setSeasonsSelected}
                    required
                  />
                  <MultiSelect
                    label="Wrist Size"
                    options={wristSizeOptions}
                    selected={wristSizeSelected}
                    onChange={setWristSizeSelected}
                    required
                  />
                </>
              )}

              {/* Footwears fields */}
              {clothingSection === 'footwears' && (
                <MultiSelect
                  label="Season"
                  options={seasonOptions}
                  selected={seasonsSelected}
                  onChange={setSeasonsSelected}
                  required
                />
              )}
            </>
          )}

          {/* Time - shown when category is selected */}
          {category && (
            <MultiSelect
              label="Time"
              options={timeOptions}
              selected={timeSelected}
              onChange={setTimeSelected}
              required
            />
          )}

          <button className="publish-btn"
            onClick={handlePublish}
            disabled={publishing}>
            {publishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewUpload;
