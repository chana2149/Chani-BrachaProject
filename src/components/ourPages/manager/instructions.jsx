import React from 'react';
import '../ourCSS.css';
import InfoIcon from '@mui/icons-material/Info';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';

export const Instructions = () => {
    return (
        <div className="instructions-page">
            <div className="page-header-modern">
                <div className="page-header-top">
                    <h1 className="page-title-modern">הוראות ניהול</h1>
                </div>
                <p className="page-description-modern">מדריך לניהול המערכת ולשימוש בכלים השונים</p>
            </div>

            <div className="instructions-container">
                <div className="instruction-section">
                    <div className="instruction-header">
                        <StoreIcon className="instruction-icon" />
                        <h2 className="instruction-title">ניהול סניפים</h2>
                    </div>
                    <div className="instruction-content">
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">הוספת סניף חדש</h3>
                            <p className="instruction-text">
                                לחץ על כפתור "הוסף סניף" בחלק העליון של עמוד הסניפים. מלא את הפרטים הנדרשים כולל שם הסניף, כתובת, טלפון ושעות פעילות. לאחר מילוי כל הפרטים, לחץ על "שמור" כדי להוסיף את הסניף למערכת.
                            </p>
                        </div>
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">עריכת פרטי סניף</h3>
                            <p className="instruction-text">
                                לחץ על כפתור "ערוך" בכרטיס הסניף הרצוי. עדכן את הפרטים הנדרשים ולחץ על "שמור" כדי לעדכן את פרטי הסניף.
                            </p>
                        </div>
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">חיפוש סניפים</h3>
                            <p className="instruction-text">
                                השתמש בשדה החיפוש בחלק העליון של העמוד כדי לחפש סניפים לפי שם או כתובת.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="instruction-section">
                    <div className="instruction-header">
                        <PeopleIcon className="instruction-icon" />
                        <h2 className="instruction-title">ניהול לקוחות</h2>
                    </div>
                    <div className="instruction-content">
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">צפייה בפרטי לקוח</h3>
                            <p className="instruction-text">
                                לחץ על כרטיס הלקוח הרצוי כדי לצפות בפרטים מלאים, כולל היסטוריית הזמנות ופרטי התקשרות.
                            </p>
                        </div>
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">חיפוש לקוחות</h3>
                            <p className="instruction-text">
                                השתמש בשדה החיפוש בחלק העליון של העמוד כדי לחפש לקוחות לפי שם, אימייל או מספר טלפון.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="instruction-section">
                    <div className="instruction-header">
                        <InventoryIcon className="instruction-icon" />
                        <h2 className="instruction-title">ניהול מוצרים</h2>
                    </div>
                    <div className="instruction-content">
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">הוספת מוצר כללי חדש</h3>
                            <p className="instruction-text">
                                לחץ על כפתור "הוסף מוצר" בחלק העליון של עמוד המוצרים. מלא את הפרטים הנדרשים כולל שם המוצר, תיאור, מחיר, קטגוריה ותמונה. לאחר מילוי כל הפרטים, לחץ על "שמור" כדי להוסיף את המוצר למערכת.
                            </p>
                        </div>
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">הוספת מוצר לסניף</h3>
                            <p className="instruction-text">
                                בחר את המוצר הכללי ולחץ על "הוסף לסניף". בחר את הסניף הרצוי מהרשימה, הגדר מחיר ספציפי לסניף זה (אם שונה מהמחיר הכללי) ולחץ על "שמור".
                            </p>
                        </div>
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">עריכת פרטי מוצר</h3>
                            <p className="instruction-text">
                                לחץ על כפתור "ערוך" בכרטיס המוצר הרצוי. עדכן את הפרטים הנדרשים ולחץ על "שמור" כדי לעדכן את פרטי המוצר.
                            </p>
                        </div>
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">מחיקת מוצר מסניף</h3>
                            <p className="instruction-text">
                                אם מוצר יצא מכלל שימוש בסניף מסוים, בחר את המוצר, לחץ על "ניהול סניפים", בחר את הסניף הרלוונטי ולחץ על "הסר מסניף". אשר את פעולת המחיקה בחלון האישור שיופיע.
                            </p>
                        </div>
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">חיפוש מוצרים</h3>
                            <p className="instruction-text">
                                השתמש בשדה החיפוש בחלק העליון של העמוד כדי לחפש מוצרים לפי שם, קטגוריה או תיאור.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="instruction-section">
                    <div className="instruction-header">
                        <SearchIcon className="instruction-icon" />
                        <h2 className="instruction-title">חיפוש במערכת</h2>
                    </div>
                    <div className="instruction-content">
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">חיפוש כללי</h3>
                            <p className="instruction-text">
                                בכל עמוד במערכת ניהול קיים שדה חיפוש בחלק העליון. הקלד את מה שברצונך לחפש והתוצאות יופיעו באופן מיידי.
                            </p>
                        </div>
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">סינון תוצאות</h3>
                            <p className="instruction-text">
                                בחלק מהעמודים ניתן לסנן את התוצאות לפי פרמטרים שונים כמו קטגוריה, סניף, מחיר ועוד. השתמש באפשרויות הסינון כדי למצוא בדיוק את מה שאתה מחפש.
                            </p>
                        </div>
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">חיפוש מתקדם</h3>
                            <p className="instruction-text">
                                לחיפוש מדויק יותר, השתמש באפשרות "חיפוש מתקדם" שמאפשרת לך להגדיר מספר פרמטרים בו-זמנית.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="instruction-section">
                    <div className="instruction-header">
                        <HelpOutlineIcon className="instruction-icon" />
                        <h2 className="instruction-title">טיפים כלליים</h2>
                    </div>
                    <div className="instruction-content">
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">עדכון מידע</h3>
                            <p className="instruction-text">
                                חשוב לעדכן את פרטי המוצרים והסניפים באופן שוטף כדי שהמידע המוצג ללקוחות יהיה מדויק ועדכני.
                            </p>
                        </div>
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">גיבוי נתונים</h3>
                            <p className="instruction-text">
                                מומלץ לבצע גיבוי של נתוני המערכת באופן קבוע למקרה של תקלה או אובדן מידע.
                            </p>
                        </div>
                        <div className="instruction-item">
                            <h3 className="instruction-subtitle">תמיכה טכנית</h3>
                            <p className="instruction-text">
                                במקרה של תקלה או שאלה, ניתן ליצור קשר עם התמיכה הטכנית בטלפון 03-1234567 או במייל support@orlinsky.co.il
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
