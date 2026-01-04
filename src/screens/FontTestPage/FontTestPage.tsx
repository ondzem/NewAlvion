import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

interface FontTest {
  family: string;
  weight: string;
  className: string;
  status: 'loading' | 'loaded' | 'failed';
}

export const FontTestPage = (): JSX.Element => {
  const [fontTests, setFontTests] = useState<FontTest[]>([]);
  const [loadingResults, setLoadingResults] = useState<Record<string, boolean>>({});

  // Complete font inventory from tailwind.css
  const fontFamilies = [
    // Halyard Display variants
    { family: 'Halyard_Display-Regular', weight: '400', className: 'font-halyard-display font-normal' },
    { family: 'Halyard_Display-Book', weight: '300', className: 'font-halyard-display font-light' },
    { family: 'Halyard_Display-Light', weight: '200', className: 'font-halyard-display font-extralight' },
    { family: 'Halyard_Display-Medium', weight: '500', className: 'font-halyard-display font-medium' },
    { family: 'Halyard_Display-SemiBold', weight: '600', className: 'font-halyard-display font-semibold' },
    { family: 'Halyard_Display-Bold', weight: '700', className: 'font-halyard-display font-bold' },
    { family: 'Halyard_Display-Black', weight: '900', className: 'font-halyard-display font-black' },
    { family: 'Halyard_Display-ExtraLight', weight: '100', className: 'font-halyard-display font-thin' },
    
    // Halyard Text variants
    { family: 'Halyard_Text-Regular', weight: '400', className: 'font-halyard-text font-normal' },
    { family: 'Halyard_Text-Light', weight: '300', className: 'font-halyard-text font-light' },
    { family: 'Halyard_Text-Medium', weight: '500', className: 'font-halyard-text font-medium' },
    { family: 'Halyard_Text-Bold', weight: '700', className: 'font-halyard-text font-bold' },
    
    // Halyard Micro variants
    { family: 'Halyard_Micro-Regular', weight: '400', className: 'font-halyard-micro font-normal' },
    { family: 'Halyard_Micro-Book', weight: '300', className: 'font-halyard-micro font-light' },
    { family: 'Halyard_Micro-Light', weight: '200', className: 'font-halyard-micro font-extralight' },
    { family: 'Halyard_Micro-Medium', weight: '500', className: 'font-halyard-micro font-medium' },
    { family: 'Halyard_Micro-SemiBold', weight: '600', className: 'font-halyard-micro font-semibold' },
    { family: 'Halyard_Micro-Bold', weight: '700', className: 'font-halyard-micro font-bold' },
    { family: 'Halyard_Micro-Black', weight: '900', className: 'font-halyard-micro font-black' },
    { family: 'Halyard_Micro-ExtraLight', weight: '100', className: 'font-halyard-micro font-thin' },
  ];

  // Test font loading
  useEffect(() => {
    const testFontLoading = async () => {
      const results: Record<string, boolean> = {};
      
      for (const font of fontFamilies) {
        try {
          // Create a test element to check if font loads
          const testElement = document.createElement('div');
          testElement.style.fontFamily = `'${font.family}', monospace`;
          testElement.style.fontSize = '16px';
          testElement.style.position = 'absolute';
          testElement.style.left = '-9999px';
          testElement.textContent = 'Test';
          document.body.appendChild(testElement);
          
          // Wait a bit for font to load
          await new Promise(resolve => setTimeout(resolve, 100));
          
          const computedStyle = window.getComputedStyle(testElement);
          const actualFontFamily = computedStyle.fontFamily;
          
          // Check if our custom font is actually being used
          results[font.family] = actualFontFamily.includes(font.family);
          
          document.body.removeChild(testElement);
        } catch (error) {
          results[font.family] = false;
        }
      }
      
      setLoadingResults(results);
    };

    testFontLoading();
  }, []);

  const testElements = [
    { type: 'Heading 1', element: 'h1', size: 'text-4xl' },
    { type: 'Heading 2', element: 'h2', size: 'text-3xl' },
    { type: 'Heading 3', element: 'h3', size: 'text-2xl' },
    { type: 'Paragraph', element: 'p', size: 'text-base' },
    { type: 'Small Text', element: 'span', size: 'text-sm' },
    { type: 'Large Text', element: 'div', size: 'text-lg' },
  ];

  return (
    <div className="w-full min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Comprehensive Font Functionality Audit
        </h1>

        {/* Font Loading Status */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Font Loading Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fontFamilies.map((font) => (
              <div
                key={font.family}
                className={`p-4 rounded-lg border ${
                  loadingResults[font.family] === true
                    ? 'bg-green-50 border-green-200'
                    : loadingResults[font.family] === false
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="font-mono text-xs text-gray-600 mb-1">
                  {font.family}
                </div>
                <div className="text-sm">
                  Weight: {font.weight}
                </div>
                <div className={`text-sm ${
                  loadingResults[font.family] === true
                    ? 'text-green-600'
                    : loadingResults[font.family] === false
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}>
                  Status: {
                    loadingResults[font.family] === true
                      ? 'Loaded ✓'
                      : loadingResults[font.family] === false
                      ? 'Failed ✗'
                      : 'Testing...'
                  }
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Font Application Testing */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Font Application Testing</h2>
          
          {fontFamilies.map((font) => (
            <div key={font.family} className="mb-8 p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-4 font-mono">
                {font.family} (Weight: {font.weight})
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testElements.map((element) => {
                  const TestElement = element.element as keyof JSX.IntrinsicElements;
                  
                  return (
                    <div key={element.type} className="p-3 bg-gray-50 rounded">
                      <div className="text-xs text-gray-600 mb-2">
                        {element.type} ({element.element})
                      </div>
                      <TestElement
                        className={`${element.size} ${font.className}`}
                        style={{ fontFamily: `'${font.family}', sans-serif` }}
                      >
                        Sample Text 123
                      </TestElement>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* UI Component Testing */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">UI Component Font Testing</h2>
          
          {fontFamilies.slice(0, 5).map((font) => (
            <div key={font.family} className="mb-8 p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-4 font-mono">
                {font.family} on UI Components
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <Button 
                    className={font.className}
                    style={{ fontFamily: `'${font.family}', sans-serif` }}
                  >
                    Button Text
                  </Button>
                  
                  <Badge 
                    className={font.className}
                    style={{ fontFamily: `'${font.family}', sans-serif` }}
                  >
                    Badge Text
                  </Badge>
                  
                  <input
                    type="text"
                    placeholder="Input placeholder"
                    className={`px-3 py-2 border rounded ${font.className}`}
                    style={{ fontFamily: `'${font.family}', sans-serif` }}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-black text-white rounded">
                    <div 
                      className={`text-lg ${font.className}`}
                      style={{ fontFamily: `'${font.family}', sans-serif` }}
                    >
                      White text on black background
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-100 rounded">
                    <div 
                      className={`text-lg ${font.className}`}
                      style={{ fontFamily: `'${font.family}', sans-serif` }}
                    >
                      Dark text on light background
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Specific Problem Testing */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Specific Problem Testing: Medium Weight</h2>
          
          <div className="space-y-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                Testing "Elektrika Bez Rizika" Styling
              </h3>
              
              <div className="space-y-4">
                {/* Original styling */}
                <div>
                  <div className="text-sm text-gray-600 mb-2">Original Styling:</div>
                  <div className="w-full h-[clamp(2.5rem,3vw,3rem)] bg-gradient-to-r from-black via-[#5C5300] to-[#D9C401] bg-clip-text text-transparent [font-family:'Halyard_Display-Medium',Helvetica] font-medium text-[clamp(1.5rem,3vw,2.5rem)] tracking-[0.05rem] leading-[clamp(2rem,4vw,3rem)]">
                    Elektrika Bez Rizika
                  </div>
                </div>
                
                {/* Test with different weights */}
                <div>
                  <div className="text-sm text-gray-600 mb-2">With font-semibold (600):</div>
                  <div className="w-full h-[clamp(2.5rem,3vw,3rem)] bg-gradient-to-r from-black via-[#5C5300] to-[#D9C401] bg-clip-text text-transparent [font-family:'Halyard_Display-SemiBold',Helvetica] font-semibold text-[clamp(1.5rem,3vw,2.5rem)] tracking-[0.05rem] leading-[clamp(2rem,4vw,3rem)]">
                    Elektrika Bez Rizika
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">With font-bold (700):</div>
                  <div className="w-full h-[clamp(2.5rem,3vw,3rem)] bg-gradient-to-r from-black via-[#5C5300] to-[#D9C401] bg-clip-text text-transparent [font-family:'Halyard_Display-Bold',Helvetica] font-bold text-[clamp(1.5rem,3vw,2.5rem)] tracking-[0.05rem] leading-[clamp(2rem,4vw,3rem)]">
                    Elektrika Bez Rizika
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">With font-normal (400):</div>
                  <div className="w-full h-[clamp(2.5rem,3vw,3rem)] bg-gradient-to-r from-black via-[#5C5300] to-[#D9C401] bg-clip-text text-transparent [font-family:'Halyard_Display-Regular',Helvetica] font-normal text-[clamp(1.5rem,3vw,2.5rem)] tracking-[0.05rem] leading-[clamp(2rem,4vw,3rem)]">
                    Elektrika Bez Rizika
                  </div>
                </div>
              </div>
            </div>
            
            {/* Test without gradient to see if that's interfering */}
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                Testing Without Gradient (Solid Black Text)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Medium weight, solid black:</div>
                  <div className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black text-[clamp(1.5rem,3vw,2.5rem)] tracking-[0.05rem] leading-[clamp(2rem,4vw,3rem)]">
                    Elektrika Bez Rizika
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Semibold weight, solid black:</div>
                  <div className="[font-family:'Halyard_Display-SemiBold',Helvetica] font-semibold text-black text-[clamp(1.5rem,3vw,2.5rem)] tracking-[0.05rem] leading-[clamp(2rem,4vw,3rem)]">
                    Elektrika Bez Rizika
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Bold weight, solid black:</div>
                  <div className="[font-family:'Halyard_Display-Bold',Helvetica] font-bold text-black text-[clamp(1.5rem,3vw,2.5rem)] tracking-[0.05rem] leading-[clamp(2rem,4vw,3rem)]">
                    Elektrika Bez Rizika
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Element Verification */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Cross-Element Verification</h2>
          
          <div className="space-y-8">
            {['Halyard_Display-Medium', 'Halyard_Display-SemiBold', 'Halyard_Display-Bold'].map((fontFamily) => (
              <div key={fontFamily} className="p-6 border rounded-lg">
                <h3 className="text-lg font-semibold mb-4 font-mono">
                  Testing {fontFamily} across elements
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 
                      className="text-xl"
                      style={{ fontFamily: `'${fontFamily}', sans-serif` }}
                    >
                      Heading Element
                    </h4>
                    
                    <p 
                      className="text-base"
                      style={{ fontFamily: `'${fontFamily}', sans-serif` }}
                    >
                      This is a paragraph element testing the font rendering and weight application.
                    </p>
                    
                    <Button 
                      style={{ fontFamily: `'${fontFamily}', sans-serif` }}
                    >
                      Button Element
                    </Button>
                    
                    <Badge 
                      style={{ fontFamily: `'${fontFamily}', sans-serif` }}
                    >
                      Badge Element
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div 
                      className="text-lg p-4 bg-black text-white rounded"
                      style={{ fontFamily: `'${fontFamily}', sans-serif` }}
                    >
                      White text on black background
                    </div>
                    
                    <div 
                      className="text-lg p-4 bg-gray-100 rounded"
                      style={{ fontFamily: `'${fontFamily}', sans-serif` }}
                    >
                      Dark text on light background
                    </div>
                    
                    <label 
                      className="block text-sm"
                      style={{ fontFamily: `'${fontFamily}', sans-serif` }}
                    >
                      Label Element
                    </label>
                    
                    <input
                      type="text"
                      placeholder="Input with custom font"
                      className="w-full px-3 py-2 border rounded"
                      style={{ fontFamily: `'${fontFamily}', sans-serif` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Font Weight Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Font Weight Visual Comparison</h2>
          
          <div className="p-6 border rounded-lg">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-2">font-thin (100):</div>
                <div className="text-2xl font-thin" style={{ fontFamily: "'Halyard_Display-ExtraLight', sans-serif" }}>
                  Sample Text - Elektrika Bez Rizika
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">font-extralight (200):</div>
                <div className="text-2xl font-extralight" style={{ fontFamily: "'Halyard_Display-Light', sans-serif" }}>
                  Sample Text - Elektrika Bez Rizika
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">font-light (300):</div>
                <div className="text-2xl font-light" style={{ fontFamily: "'Halyard_Display-Book', sans-serif" }}>
                  Sample Text - Elektrika Bez Rizika
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">font-normal (400):</div>
                <div className="text-2xl font-normal" style={{ fontFamily: "'Halyard_Display-Regular', sans-serif" }}>
                  Sample Text - Elektrika Bez Rizika
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">font-medium (500) - PROBLEMATIC:</div>
                <div className="text-2xl font-medium" style={{ fontFamily: "'Halyard_Display-Medium', sans-serif" }}>
                  Sample Text - Elektrika Bez Rizika
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">font-semibold (600):</div>
                <div className="text-2xl font-semibold" style={{ fontFamily: "'Halyard_Display-SemiBold', sans-serif" }}>
                  Sample Text - Elektrika Bez Rizika
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">font-bold (700):</div>
                <div className="text-2xl font-bold" style={{ fontFamily: "'Halyard_Display-Bold', sans-serif" }}>
                  Sample Text - Elektrika Bez Rizika
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">font-black (900):</div>
                <div className="text-2xl font-black" style={{ fontFamily: "'Halyard_Display-Black', sans-serif" }}>
                  Sample Text - Elektrika Bez Rizika
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fallback Testing */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Fallback Font Testing</h2>
          
          <div className="p-6 border rounded-lg">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-2">With fallback to system fonts:</div>
                <div className="text-2xl font-medium" style={{ fontFamily: "'NonExistentFont', 'Halyard_Display-Medium', sans-serif" }}>
                  Testing fallback behavior
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">System font only (for comparison):</div>
                <div className="text-2xl font-medium" style={{ fontFamily: "sans-serif" }}>
                  System font reference
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Validation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Technical Validation</h2>
          
          <div className="p-6 border rounded-lg">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Font File Paths (Check in Network tab):</h4>
                <ul className="space-y-1 text-sm font-mono">
                  <li>/Fonts/fonnts.com-Halyard_Display_Medium.otf</li>
                  <li>/Fonts/fonnts.com-Halyard_Display_SemiBold.otf</li>
                  <li>/Fonts/fonnts.com-Halyard_Display_Bold.otf</li>
                  <li>/Fonts/fonnts.com-Halyard_Display_Regular.otf</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Instructions for Manual Testing:</h4>
                <ol className="space-y-2 text-sm">
                  <li>1. Open browser DevTools (F12)</li>
                  <li>2. Go to Network tab</li>
                  <li>3. Filter by "Font" or search for ".otf"</li>
                  <li>4. Refresh the page</li>
                  <li>5. Check if all font files load successfully (status 200)</li>
                  <li>6. Select any text element and check "Computed" styles</li>
                  <li>7. Verify font-family and font-weight values</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Results Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Audit Results Summary</h2>
          
          <div className="p-6 border rounded-lg bg-yellow-50">
            <h3 className="font-semibold mb-4">Potential Issues Identified:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Font-medium (weight 500) may not be visually distinct from font-normal (400)</li>
              <li>• Gradient text effects might mask font weight differences</li>
              <li>• Custom font files may not contain proper weight data</li>
              <li>• Browser font rendering may vary between systems</li>
            </ul>
            
            <h3 className="font-semibold mt-6 mb-4">Recommendations:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Use font-semibold (600) or font-bold (700) for more noticeable weight differences</li>
              <li>• Test fonts without gradient effects first to isolate issues</li>
              <li>• Verify font file integrity and proper weight mapping</li>
              <li>• Consider using system fonts as fallbacks for critical text</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};